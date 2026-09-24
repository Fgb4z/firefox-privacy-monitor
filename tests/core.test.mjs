import test from 'node:test';
import assert from 'node:assert/strict';
import { thirdParty, site, normalizeRule, blockedBy, safeUrl, parseSetCookie, cookieKey, scoreReport, pollingEvidence, querySignals } from '../src/core.js';

test('PSL diferencia com.br, co.uk, sufixos privados, IPs e subdomínios', () => {
  assert.equal(thirdParty('https://cdn.loja.com.br', 'https://www.loja.com.br'), false);
  assert.equal(thirdParty('https://a.co.uk', 'https://b.co.uk'), true);
  assert.equal(thirdParty('https://alice.github.io', 'https://bob.github.io'), true);
  assert.equal(site('https://sub.example.com'), 'example.com');
  assert.equal(thirdParty('http://localhost:8787', 'http://127.0.0.1:8787'), true);
});
test('bloqueio usa fronteiras DNS e valida entrada', () => {
  assert.equal(blockedBy('cdn.example.com', ['example.com']), 'example.com');
  assert.equal(blockedBy('notexample.com', ['example.com']), null);
  assert.equal(normalizeRule(' EXAMPLE.COM '), 'example.com');
  for (const rule of ['https://example.com', '*.com', 'example.com/path', 'a@b.com', '', 'com']) assert.throws(() => normalizeRule(rule));
});
test('exportação remove valores de query, credenciais e fragmentos', () => {
  const result = safeUrl('https://user:secret@example.com/path?uid=secret&uid=other#token');
  assert.ok(!result.includes('secret')); assert.ok(!result.includes('other')); assert.ok(!result.includes('user:'));
  assert.deepEqual(querySignals('https://e.com/?uid=x&utm_source=y&search=z'), ['uid', 'utm_source']);
});
test('cookies: sessão, persistência, remoção, partição e valores omitidos', () => {
  const session = parseSetCookie('sid=secret; Secure; HttpOnly; SameSite=Lax', 'https://a.example.com/x');
  assert.equal(session.session, true); assert.equal(session.httpOnly, true); assert.equal(session.domain, 'a.example.com'); assert.ok(!JSON.stringify(session).includes('secret'));
  const persistent = parseSetCookie('sid=x; Domain=.example.com; Max-Age=60; Partitioned', 'https://example.com'); assert.equal(persistent.session, false); assert.equal(persistent.partitioned, true);
  assert.equal(parseSetCookie('sid=x; Max-Age=0', 'https://example.com').deletion, true);
  assert.notEqual(cookieKey({ ...session, partitionKey: { topLevelSite: 'https://a.com' } }), cookieKey({ ...session, partitionKey: { topLevelSite: 'https://b.com' } }));
});
test('polling exige recorrência e janela temporal, ignorando bloqueios', () => {
  const requests = Array.from({ length: 6 }, (_, i) => ({ thirdParty: true, type: 'xmlhttprequest', time: i * 2200, url: 'https://third.com/poll' }));
  assert.equal(pollingEvidence(requests).length, 1);
  assert.equal(pollingEvidence(requests.map(x => ({ ...x, blocked: true }))).length, 0);
  assert.equal(pollingEvidence(requests.map(x => ({ ...x, time: 1 }))).length, 0);
});
test('score auditável: não penaliza requisição bloqueada como entregue', () => {
  const base = { requests: [], cookies: [], events: [], signals: [] };
  assert.equal(scoreReport(base).value, 100);
  const request = { domain: 'tracker.com', thirdParty: true, tracker: 'fixture', status: 200 };
  assert.equal(scoreReport({ ...base, requests: [request] }).value, 92);
  assert.equal(scoreReport({ ...base, requests: [{ ...request, blocked: true }] }).value, 100);
  const saturated = { requests: Array.from({ length: 20 }, (_, i) => ({ ...request, domain: `${i}.com` })), cookies: Array.from({ length: 10 }, () => ({ thirdParty: true, session: false })), events: [...Array.from({ length: 10 }, (_, i) => ({ kind: 'storage', thirdParty: true, outcome: 'success', frameOrigin: `${i}.com`, api: 'localStorage.setItem' })), { kind: 'canvas', outcome: 'success' }, { kind: 'hook' }], signals: [{ kind: 'cookie-sync' }, { kind: 'bounce' }, { kind: 'polling' }] };
  const score = scoreReport(saturated); assert.equal(score.value, 0); assert.equal(score.rows.reduce((s,r) => s+r.penalty, 0), 100);
});
