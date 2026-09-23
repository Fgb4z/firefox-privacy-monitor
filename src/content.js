// Firefox: wrappers exportados diretamente, sem eval, script inline ou ponte postMessage pública.
(() => {
  const page = window.wrappedJSObject;
  const queue = [], watched = [], seen = new Set();
  let emitted = 0, limited = false;
  const emit = (kind, api, outcome, detail = '') => {
    if (emitted++ < 3000 && queue.length < 100) queue.push({ kind, api, outcome, detail, time: Date.now() });
    else if (!limited) { limited = true; if (queue.length >= 100) queue.pop(); queue.push({ kind: 'coverage', api: 'instrumentation', outcome: 'limit', detail: 'Limite de eventos atingido; observação parcial.', time: Date.now() }); }
  };
  function flush() { if (queue.length) browser.runtime.sendMessage({ type: 'events', events: queue.splice(0, 100) }).catch(() => {}); }
  function wrap(object, name, kind, api) {
    if (!object) return;
    try {
      const descriptor = Object.getOwnPropertyDescriptor(object, name);
      if (typeof descriptor?.value !== 'function') return;
      const original = descriptor.value;
      const replacement = exportFunction(function (...args) {
        let result;
        try { result = Reflect.apply(original, this, args); }
        catch (error) { emit(kind, api, 'denied', 'A API lançou uma exceção; valores não coletados.'); throw error; }
        let actualApi = api;
        if (kind === 'storage' && api.startsWith('Storage.')) {
          try {
            // exportFunction entrega receptores Xray; normalizar antes de comparar.
            const receiver = this?.wrappedJSObject || this;
            const local = window.localStorage, session = window.sessionStorage;
            actualApi = `${receiver === (local.wrappedJSObject || local) ? 'localStorage' : receiver === (session.wrappedJSObject || session) ? 'sessionStorage' : 'Storage'}.${name}`;
          } catch { /* storage negado */ }
        }
        emit(kind, actualApi, 'success', kind === 'canvas' ? 'Leitura de pixels/serialização; não comprova fingerprinting.' : 'Chamada retornou; operações assíncronas podem falhar posteriormente.');
        return result;
      }, page);
      Object.defineProperty(object, name, { ...descriptor, value: replacement });
      // Ler de volta no mesmo compartimento evita comparar wrapper Xray com
      // função desembrulhada e denunciar a própria instrumentação como hook.
      watched.push({ object, name, expected: Object.getOwnPropertyDescriptor(object, name).value, api });
    } catch { emit('coverage', api, 'unavailable', 'Não foi possível instrumentar esta API.'); }
  }
  try {
    for (const name of ['getItem', 'setItem', 'removeItem', 'clear', 'key']) wrap(page.Storage?.prototype, name, 'storage', `Storage.${name}`);
    for (const name of ['open', 'deleteDatabase', 'databases']) wrap(page.IDBFactory?.prototype, name, 'storage', `IndexedDB.${name}`);
    for (const name of ['get', 'getAll', 'put', 'add', 'delete', 'clear']) wrap(page.IDBObjectStore?.prototype, name, 'storage', `IndexedDB.${name}`);
    for (const name of ['toDataURL', 'toBlob']) wrap(page.HTMLCanvasElement?.prototype, name, 'canvas', `HTMLCanvasElement.${name}`);
    wrap(page.CanvasRenderingContext2D?.prototype, 'getImageData', 'canvas', 'CanvasRenderingContext2D.getImageData');
    for (const name of ['WebGLRenderingContext', 'WebGL2RenderingContext']) wrap(page[name]?.prototype, 'readPixels', 'canvas', `${name}.readPixels`);
    wrap(page.OffscreenCanvas?.prototype, 'convertToBlob', 'canvas', 'OffscreenCanvas.convertToBlob');
    const cookie = Object.getOwnPropertyDescriptor(page.Document.prototype, 'cookie');
    if (cookie?.set) {
      const setter = exportFunction(function (value) {
        // Não serializar objetos controlados pela página; preservar a conversão do setter nativo.
        const result = Reflect.apply(cookie.set, this, [value]);
        emit('cookie-write', 'document.cookie', 'attempt', typeof value === 'string' ? value.slice(0, value.indexOf('=') < 0 ? 0 : value.indexOf('=')).slice(0, 100) : '(não textual)');
        return result;
      }, page);
      Object.defineProperty(page.Document.prototype, 'cookie', { ...cookie, set: setter });
    }
    for (const name of ['fetch', 'WebSocket', 'XMLHttpRequest', 'eval', 'open']) {
      const d = Object.getOwnPropertyDescriptor(page, name);
      if (d && 'value' in d) watched.push({ object: page, name, expected: d.value, api: `window.${name}` });
    }
    emit('coverage', 'instrumentation', 'ready', `${watched.length} métodos/propriedades monitorados. Wrappers do próprio monitor excluídos da baseline.`);
  } catch { emit('coverage', 'instrumentation', 'error', 'Instrumentação parcial.'); }
  function inspect() {
    for (const item of watched) {
      try {
        const d = Object.getOwnPropertyDescriptor(item.object, item.name);
        if ((!d || d.value !== item.expected) && !seen.has(item.api)) { seen.add(item.api); emit('hook', item.api, 'changed', 'Referência alterada após document_start. Frameworks e extensões também podem causar isso.'); }
      } catch { /* objeto revogado */ }
    }
    for (const api of ['localStorage', 'sessionStorage']) {
      try { emit('storage-snapshot', api, 'success', `${window[api].length} chaves presentes (não atribui escritas à página).`); }
      catch { emit('storage-snapshot', api, 'denied', 'Acesso negado pelo navegador.'); }
    }
    flush();
  }
  const sendTimer = setInterval(flush, 500), inspectTimer = setInterval(inspect, 2000);
  addEventListener('DOMContentLoaded', inspect, { once: true });
  addEventListener('pagehide', () => { flush(); }, { capture: true });
  // Timers são destruídos junto com o documento; mantidos ao restaurar via bfcache.
  void sendTimer; void inspectTimer;
  flush();
})();
