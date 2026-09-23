(() => {
  // src/content.js
  (() => {
    const page = window.wrappedJSObject;
    const queue = [], watched = [], seen = /* @__PURE__ */ new Set();
    let emitted = 0, limited = false;
    const emit = (kind, api, outcome, detail = "") => {
      if (emitted++ < 3e3 && queue.length < 100) queue.push({ kind, api, outcome, detail, time: Date.now() });
      else if (!limited) {
        limited = true;
        if (queue.length >= 100) queue.pop();
        queue.push({ kind: "coverage", api: "instrumentation", outcome: "limit", detail: "Limite de eventos atingido; observa\xE7\xE3o parcial.", time: Date.now() });
      }
    };
    function flush() {
      if (queue.length) browser.runtime.sendMessage({ type: "events", events: queue.splice(0, 100) }).catch(() => {
      });
    }
    function wrap(object, name, kind, api) {
      if (!object) return;
      try {
        const descriptor = Object.getOwnPropertyDescriptor(object, name);
        if (typeof descriptor?.value !== "function") return;
        const original = descriptor.value;
        const replacement = exportFunction(function(...args) {
          let result;
          try {
            result = Reflect.apply(original, this, args);
          } catch (error) {
            emit(kind, api, "denied", "A API lan\xE7ou uma exce\xE7\xE3o; valores n\xE3o coletados.");
            throw error;
          }
          let actualApi = api;
          if (kind === "storage" && api.startsWith("Storage.")) {
            try {
              const receiver = this?.wrappedJSObject || this;
              const local = window.localStorage, session = window.sessionStorage;
              actualApi = `${receiver === (local.wrappedJSObject || local) ? "localStorage" : receiver === (session.wrappedJSObject || session) ? "sessionStorage" : "Storage"}.${name}`;
            } catch {
            }
          }
          emit(kind, actualApi, "success", kind === "canvas" ? "Leitura de pixels/serializa\xE7\xE3o; n\xE3o comprova fingerprinting." : "Chamada retornou; opera\xE7\xF5es ass\xEDncronas podem falhar posteriormente.");
          return result;
        }, page);
        Object.defineProperty(object, name, { ...descriptor, value: replacement });
        watched.push({ object, name, expected: Object.getOwnPropertyDescriptor(object, name).value, api });
      } catch {
        emit("coverage", api, "unavailable", "N\xE3o foi poss\xEDvel instrumentar esta API.");
      }
    }
    try {
      for (const name of ["getItem", "setItem", "removeItem", "clear", "key"]) wrap(page.Storage?.prototype, name, "storage", `Storage.${name}`);
      for (const name of ["open", "deleteDatabase", "databases"]) wrap(page.IDBFactory?.prototype, name, "storage", `IndexedDB.${name}`);
      for (const name of ["get", "getAll", "put", "add", "delete", "clear"]) wrap(page.IDBObjectStore?.prototype, name, "storage", `IndexedDB.${name}`);
      for (const name of ["toDataURL", "toBlob"]) wrap(page.HTMLCanvasElement?.prototype, name, "canvas", `HTMLCanvasElement.${name}`);
      wrap(page.CanvasRenderingContext2D?.prototype, "getImageData", "canvas", "CanvasRenderingContext2D.getImageData");
      for (const name of ["WebGLRenderingContext", "WebGL2RenderingContext"]) wrap(page[name]?.prototype, "readPixels", "canvas", `${name}.readPixels`);
      wrap(page.OffscreenCanvas?.prototype, "convertToBlob", "canvas", "OffscreenCanvas.convertToBlob");
      const cookie = Object.getOwnPropertyDescriptor(page.Document.prototype, "cookie");
      if (cookie?.set) {
        const setter = exportFunction(function(value) {
          const result = Reflect.apply(cookie.set, this, [value]);
          emit("cookie-write", "document.cookie", "attempt", typeof value === "string" ? value.slice(0, value.indexOf("=") < 0 ? 0 : value.indexOf("=")).slice(0, 100) : "(n\xE3o textual)");
          return result;
        }, page);
        Object.defineProperty(page.Document.prototype, "cookie", { ...cookie, set: setter });
      }
      for (const name of ["fetch", "WebSocket", "XMLHttpRequest", "eval", "open"]) {
        const d = Object.getOwnPropertyDescriptor(page, name);
        if (d && "value" in d) watched.push({ object: page, name, expected: d.value, api: `window.${name}` });
      }
      emit("coverage", "instrumentation", "ready", `${watched.length} m\xE9todos/propriedades monitorados. Wrappers do pr\xF3prio monitor exclu\xEDdos da baseline.`);
    } catch {
      emit("coverage", "instrumentation", "error", "Instrumenta\xE7\xE3o parcial.");
    }
    function inspect() {
      for (const item of watched) {
        try {
          const d = Object.getOwnPropertyDescriptor(item.object, item.name);
          if ((!d || d.value !== item.expected) && !seen.has(item.api)) {
            seen.add(item.api);
            emit("hook", item.api, "changed", "Refer\xEAncia alterada ap\xF3s document_start. Frameworks e extens\xF5es tamb\xE9m podem causar isso.");
          }
        } catch {
        }
      }
      for (const api of ["localStorage", "sessionStorage"]) {
        try {
          emit("storage-snapshot", api, "success", `${window[api].length} chaves presentes (n\xE3o atribui escritas \xE0 p\xE1gina).`);
        } catch {
          emit("storage-snapshot", api, "denied", "Acesso negado pelo navegador.");
        }
      }
      flush();
    }
    const sendTimer = setInterval(flush, 500), inspectTimer = setInterval(inspect, 2e3);
    addEventListener("DOMContentLoaded", inspect, { once: true });
    addEventListener("pagehide", () => {
      flush();
    }, { capture: true });
    void sendTimer;
    void inspectTimer;
    flush();
  })();
})();
