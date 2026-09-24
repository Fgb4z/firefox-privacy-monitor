import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';

const bundle = await build({ entryPoints: ['src/background.js'], bundle: true, write: false, format: 'iife' });
function event() { const listeners = []; return { addListener(fn) { listeners.push(fn); }, async fire(...args) { let result; for (const fn of listeners) result = await fn(...args); return result; } }; }
function setup() {
  let jar = [];
  const browser = {
    storage: { local: { get: async () => ({}), set: async () => {} } },
    tabs: { get: async () => ({ cookieStoreId: 'firefox-default' }), onRemoved: event() },
    cookies: { getAll: async () => jar, onChanged: event() },
    browserAction: { setBadgeText: async () => {} },
    runtime: { id: 'test', getURL: path => `moz-extension://test/${path}`, onMessage: event() },
    webRequest: Object.fromEntries(['onBeforeRequest','onHeadersReceived','onBeforeRedirect','onCompleted','onErrorOccurred'].map(k => [k,event()]))
  };
  vm.runInNewContext(bundle.outputFiles[0].text, { browser, URL, Date, console, setTimeout });
  const sender = { id: 'test', url: 'moz-extension://test/ui/report.html', tab: { id: 99 } };
  return { browser, setJar: value => { jar = value; }, message: m => browser.runtime.onMessage.fire(m, sender) };
}
function request(id, url, type = 'main_frame', tabId = 1) { return { requestId: id, url, type, tabId, frameId: 0, timeStamp: Date.now() }; }

test('background: captura, bloqueio, cookies e exportação por aba', async () => {
  const { browser: b, message, setJar } = setup();
  await message({ type: 'save-rules', rules: ['tracker.com'] });
  await b.webRequest.onBeforeRequest.fire(request('1','https://example.com'));
  await b.webRequest.onHeadersReceived.fire({ ...request('1','https://example.com'), statusCode: 200, responseHeaders: [{ name: 'Set-Cookie', value: 'uid=secret-identifier; Max-Age=3600; Path=/' }] });
  const result = await b.webRequest.onBeforeRequest.fire(request('2','https://tracker.com/pixel?uid=secret-identifier','image'));
  assert.equal(result.cancel, true);
  setJar([{ name: 'uid', value: 'secret-identifier', domain: 'example.com', path: '/', storeId: 'firefox-default', session: false }]);
  const r = await message({ type: 'report', tabId: 1 });
  assert.equal(r.requests.length, 2); assert.equal(r.cookieAttempts.length, 1); assert.equal(r.cookies.length, 1); assert.equal(r.cookies[0].newSinceBaseline, true);
  assert.ok(!JSON.stringify(r).includes('secret-identifier'));
  assert.ok(r.signals.some(s => s.kind === 'cookie-sync'));
  assert.equal(await message({ type: 'report', tabId: 2 }), null);
  await b.tabs.onRemoved.fire(1); assert.equal(await message({ type: 'report', tabId: 1 }), null);
});
test('background: navegação reinicia coleta, redirects preservam cadeia', async () => {
  const { browser: b, message } = setup();
  await b.webRequest.onBeforeRequest.fire(request('1','https://a.com'));
  await b.webRequest.onBeforeRedirect.fire({ ...request('1','https://a.com'), redirectUrl:'https://b.com/hop',statusCode:302 });
  await b.webRequest.onBeforeRequest.fire(request('1','https://b.com/hop'));
  await b.webRequest.onBeforeRedirect.fire({ ...request('1','https://b.com/hop'),redirectUrl:'https://a.com/end',statusCode:302 });
  await b.webRequest.onBeforeRequest.fire(request('1','https://a.com/end'));
  const r = await message({ type: 'report', tabId: 1 }); assert.equal(r.requests.length,3); assert.ok(r.signals.some(s => s.kind === 'bounce'));
  await b.webRequest.onBeforeRequest.fire(request('2','https://new.com'));
  assert.equal((await message({ type: 'report', tabId: 1 })).requests.length,1);
});
test('background: Set-Cookie combinados pelo Firefox preservam contagem e sessão', async () => {
  const { browser: b, message } = setup();
  await b.webRequest.onBeforeRequest.fire(request('1','https://a.com'));
  await b.webRequest.onHeadersReceived.fire({ ...request('1','https://a.com'), statusCode:200, responseHeaders:[{name:'Set-Cookie',value:'session=a; Path=/\npersistent=b; Expires=Wed, 01 Jan 2031 00:00:00 GMT; Path=/'}] });
  const r = await message({type:'report',tabId:1}); assert.equal(r.cookieAttempts.length,2); assert.equal(r.cookieAttempts[0].session,true); assert.equal(r.cookieAttempts[1].session,false);
});
test('background: página não pode editar regras e frames terceiros são atribuídos', async () => {
  const { browser: b, message } = setup();
  await b.webRequest.onBeforeRequest.fire(request('1','https://a.com'));
  const sender = { id:'test', tab:{id:1}, frameId:2, url:'https://third.com/frame' };
  await b.runtime.onMessage.fire({type:'save-rules',rules:['a.com']}, sender);
  assert.equal((await message({type:'rules'})).length,0);
  await b.runtime.onMessage.fire({type:'events',events:[{kind:'canvas',api:'toDataURL',outcome:'success'}]}, sender);
  const r = await message({type:'report',tabId:1}); assert.equal(r.events[0].thirdParty,true); assert.equal(r.events[0].frameId,2);
});
