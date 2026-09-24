import http from 'node:http';

const port = Number(process.env.PORT || 8787);
const script = `
document.cookie = 'js_session=fixture-identifier-123; SameSite=Lax';
localStorage.setItem('privacy-monitor-fixture', 'local');
sessionStorage.setItem('privacy-monitor-fixture', 'session');
indexedDB.open('privacy-monitor-fixture', 1);
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); ctx.font = '18px sans-serif'; ctx.fillText('Privacy Monitor', 10, 35); canvas.toDataURL(); ctx.getImageData(0, 0, 10, 10);
const initialFetch = window.fetch; window.fetch = function(...args) { return initialFetch.apply(this, args); };
let count = 0; const timer = setInterval(() => { fetch('http://127.0.0.1:${port}/pixel?uid=fixture-identifier-123').catch(() => {}); if (++count >= 7) clearInterval(timer); }, 2000);
document.querySelector('#done').textContent = 'Operações disparadas. Aguarde 15 segundos antes de abrir o monitor.';
`;
const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Privacy Monitor — fixture controlada</title><style>body{font:18px system-ui;max-width:850px;margin:50px auto;line-height:1.7;padding:20px}canvas{border:1px solid #ccc}code{background:#eee}</style><h1>Fixture controlada</h1><p>Abra via <code>http://localhost:${port}</code>. O frame e os pedidos a <code>127.0.0.1</code> são terceiros em relação a localhost. Dados sintéticos, sem envio externo.</p><canvas width="280" height="60"></canvas><p id="done">Executando…</p><iframe title="Frame terceiro de teste" src="http://127.0.0.1:${port}/frame"></iframe><p><a href="/bounce">Testar bounce HTTP (localhost → 127.0.0.1 → localhost)</a></p><ul><li>2 tentativas Set-Cookie (sessão e persistente) + 1 document.cookie.</li><li>localStorage, sessionStorage e IndexedDB.</li><li>2 leituras canvas; alteração de window.fetch.</li><li>7 pedidos periódicos externos em 12 segundos.</li><li>Cookie e query uid compartilham identificador sintético.</li><li>Adicione 127.0.0.1 à lista e recarregue: frame e polling devem ser bloqueados.</li></ul><script src="/fixture.js"></script></html>`;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (url.pathname === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  if (url.pathname === '/bounce') { res.writeHead(302, { Location: `http://127.0.0.1:${port}/hop?uid=fixture-identifier-123` }); res.end(); return; }
  if (url.pathname === '/hop') { res.writeHead(302, { Location: `http://localhost:${port}/arrived?uid=fixture-identifier-123` }); res.end(); return; }
  if (url.pathname === '/pixel') { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('ok'); return; }
  if (url.pathname === '/fixture.js') { res.writeHead(200, { 'Content-Type': 'application/javascript' }); res.end(script); return; }
  if (url.pathname === '/frame') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end('<!doctype html><p>Frame terceiro</p><script>try { localStorage.setItem("third-party-fixture", "ok"); sessionStorage.setItem("third-party-fixture", "ok"); indexedDB.open("third-party-fixture", 1); document.cookie="frame_session=fixture-frame-123; SameSite=Lax"; } catch(e) { document.body.append(e.name); }</script>'); return; }
  if (url.pathname === '/arrived') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end('<!doctype html><h1>Bounce concluído</h1><p>Abra o monitor e procure a cadeia de redirecionamentos.</p>'); return; }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Set-Cookie': ['http_session=fixture-identifier-123; SameSite=Lax; Path=/', 'http_persistent=fixture-persist-123; Max-Age=86400; SameSite=Lax; Path=/'] }); res.end(html);
});
server.listen(port, '0.0.0.0', () => console.log(`Fixture: http://localhost:${port} (encerre com Ctrl+C)`));
