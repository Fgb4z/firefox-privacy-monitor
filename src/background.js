import { host, site, thirdParty, blockedBy, normalizeRule, trackerName, querySignals, safeUrl, parseSetCookie, cookieKey, pollingEvidence, scoreReport } from './core.js';

const pages = new Map(), requestPages = new Map(), journeys = new Map();
let rules = [];
const ready = browser.storage.local.get('rules').then(data => { rules = (data.rules || []).map(normalizeRule); }).catch(console.error);
const LIMIT = 3000;
function createPage(tabId, url) {
  const p = { id: `${tabId}-${Date.now()}`, tabId, url: safeUrl(url), startedAt: new Date().toISOString(), startedMs: Date.now(), requests: [], cookies: [], cookieAttempts: [], cookieChanges: [], events: [], signals: [], domains: new Set(), baseline: new Set(), baselineReady: false, truncated: false, warnings: [], storeId: null, identifiers: new Map(), snapshots: new Map() };
  pages.set(tabId, p);
  browser.tabs.get(tabId).then(async tab => {
    p.storeId = tab.cookieStoreId;
    const all = await browser.cookies.getAll({ storeId: p.storeId, partitionKey: {} });
    p.baseline = new Set(all.map(cookieKey)); p.baselineReady = true;
  }).catch(() => p.warnings.push('Não foi possível estabelecer baseline de cookies.'));
  return p;
}
function push(p, field, value) { if (p[field].length < LIMIT) p[field].push(value); else p.truncated = true; }
function signal(p, s) { if (!p.signals.some(v => JSON.stringify(v) === JSON.stringify(s))) push(p, 'signals', s); }
function correlate(p, url, source) {
  try {
    const u = new URL(url);
    for (const [key, value] of u.searchParams) {
      if (value.length < 8 || value.length > 256 || !/^[\w.-]+$/.test(value) || !querySignals(url).includes(key)) continue;
      const previous = p.identifiers.get(value);
      if (previous && thirdParty(previous.domain, u.hostname)) signal(p, { kind: 'cookie-sync', confidence: 'média', source: previous.source, from: previous.domain, to: u.hostname, parameter: key, url: safeUrl(url), note: 'Mesmo identificador observado em sites distintos; valor omitido. Não prova sincronização.' });
      if (p.identifiers.size < 500) p.identifiers.set(value, { domain: u.hostname, source });
    }
  } catch { /* URL não HTTP */ }
}
function rememberCookie(p, value, domain) { if (typeof value === 'string' && value.length >= 8 && value.length <= 256 && p.identifiers.size < 500) p.identifiers.set(value, { domain, source: 'cookie' }); }

browser.webRequest.onBeforeRequest.addListener(async d => {
  await ready;
  // Service workers podem gerar pedidos sem tabId. A regra é global, mesmo
  // quando não há atribuição confiável desses pedidos a um relatório de aba.
  if (d.tabId < 0) return blockedBy(host(d.url), rules) ? { cancel: true } : {};
  let p = pages.get(d.tabId);
  const previous = journeys.get(d.tabId);
  if (d.type === 'main_frame') {
    const redirectContinuation = p && p.redirectRequest === d.requestId;
    if (!redirectContinuation) {
      const old = p;
      p = createPage(d.tabId, d.url);
      const now = Date.now();
      if (old && previous && now - old.startedMs < 10000 && thirdParty(previous.url, old.url) && thirdParty(old.url, d.url)) {
        signal(p, { kind: 'bounce', confidence: 'baixa', from: previous.url, via: old.url, to: safeUrl(d.url), dwellMs: now - old.startedMs, note: 'Navegação rápida A → B → C; pode ser login, pagamento ou clique legítimo.' });
      }
      if (old) journeys.set(d.tabId, { url: old.url });
    }
    p.url = safeUrl(d.url);
  }
  if (!p) p = createPage(d.tabId, d.documentUrl || d.originUrl || d.url);
  const domain = host(d.url), rule = blockedBy(domain, rules);
  if (p.domains.size < LIMIT) p.domains.add(domain); else p.truncated = true;
  const request = { id: d.requestId, time: d.timeStamp, url: safeUrl(d.url), domain, type: d.type, frameId: d.frameId, origin: safeUrl(d.originUrl || d.documentUrl || ''), thirdParty: thirdParty(d.url, p.url), tracker: trackerName(domain), blocked: Boolean(rule), rule, status: null };
  push(p, 'requests', request);
  requestPages.set(d.requestId, { p, request });
  if (requestPages.size > 10000) requestPages.delete(requestPages.keys().next().value);
  const parameters = querySignals(d.url);
  if (parameters.length) signal(p, { kind: 'query', parameters, url: request.url, confidence: 'baixa' });
  correlate(p, d.url, 'query');
  if (d.type === 'websocket' && request.thirdParty) signal(p, { kind: 'websocket-attempt', url: request.url, blocked: Boolean(rule), confidence: 'baixa', note: 'Tentativa de canal; duração e conteúdo das mensagens não são observados.' });
  browser.browserAction.setBadgeText({ tabId: d.tabId, text: String(new Set(p.requests.filter(r => r.thirdParty).map(r => r.domain)).size) }).catch(() => {});
  return rule ? { cancel: true } : {};
}, { urls: ['<all_urls>'] }, ['blocking']);

browser.webRequest.onHeadersReceived.addListener(d => {
  const entry = requestPages.get(d.requestId); if (!entry) return;
  const { p, request } = entry; request.status = d.statusCode;
  if (request.type === 'websocket' && request.thirdParty && d.statusCode === 101 && !request.blocked) signal(p, { kind: 'websocket', url: request.url, confidence: 'baixa', note: 'Handshake 101 observado; canal pode ser legítimo. Duração e mensagens não observadas.' });
  for (const h of d.responseHeaders || []) {
    if (h.name.toLowerCase() !== 'set-cookie' || !h.value) continue;
    // Firefox pode combinar Set-Cookie repetidos com quebras de linha. Vírgulas
    // pertencem a Expires e não são separadores seguros de cookies.
    for (const line of h.value.split(/\r?\n/)) {
      const cookie = parseSetCookie(line, d.url); if (!cookie) continue;
      push(p, 'cookieAttempts', { ...cookie, thirdParty: thirdParty(cookie.domain, p.url), url: safeUrl(d.url), requestId: d.requestId, time: d.timeStamp, source: 'Set-Cookie', accepted: 'não determinado' });
      rememberCookie(p, line.split(';')[0].slice(line.indexOf('=') + 1), cookie.domain);
    }
  }
}, { urls: ['<all_urls>'] }, ['responseHeaders']);

browser.webRequest.onBeforeRedirect.addListener(d => {
  const entry = requestPages.get(d.requestId); if (!entry) return;
  const { p, request } = entry; request.redirectUrl = safeUrl(d.redirectUrl); request.status = d.statusCode;
  if (d.type === 'main_frame') {
    p.redirectRequest = d.requestId;
    signal(p, { kind: 'redirect', from: safeUrl(d.url), to: safeUrl(d.redirectUrl), status: d.statusCode, requestId: d.requestId });
    const redirects = p.signals.filter(s => s.kind === 'redirect');
    if (redirects.length >= 2) {
      const a = redirects.at(-2), b = redirects.at(-1);
      if (thirdParty(a.from, a.to) && thirdParty(b.from, b.to)) signal(p, { kind: 'bounce', confidence: 'média', from: a.from, via: a.to, to: b.to, note: 'Cadeia HTTP entre sites distintos; intenção de rastreamento não comprovada.' });
    }
  }
  correlate(p, d.redirectUrl, 'redirect');
}, { urls: ['<all_urls>'] });

for (const [event, failed] of [[browser.webRequest.onCompleted, false], [browser.webRequest.onErrorOccurred, true]]) {
  event.addListener(d => { const entry = requestPages.get(d.requestId); if (entry) { entry.request.status = d.statusCode || entry.request.status; entry.request.error = failed ? d.error : null; entry.request.completedAt = d.timeStamp; } requestPages.delete(d.requestId); }, { urls: ['<all_urls>'] });
}
browser.cookies.onChanged.addListener(change => {
  for (const p of pages.values()) {
    const c = change.cookie;
    if (!p.storeId || c.storeId !== p.storeId || ![...p.domains].some(h => h === c.domain.replace(/^\./, '') || h.endsWith(c.domain.startsWith('.') ? c.domain : `.${c.domain}`))) continue;
    if (c.partitionKey?.topLevelSite && site(c.partitionKey.topLevelSite) !== site(p.url)) continue;
    push(p, 'cookieChanges', { name: c.name, domain: c.domain, removed: change.removed, cause: change.cause, time: Date.now(), attribution: 'domínio e partição; API não informa aba de origem' });
    if (!change.removed) rememberCookie(p, c.value, c.domain);
  }
});

async function snapshot(p) {
  const cookies = new Map();
  try {
    if (!p.storeId) p.storeId = (await browser.tabs.get(p.tabId)).cookieStoreId;
    const all = await browser.cookies.getAll({ storeId: p.storeId, partitionKey: {} });
    for (const c of all) {
      const domain = c.domain.replace(/^\./, '');
      if (![...p.domains].some(h => h === domain || h.endsWith(`.${domain}`))) continue;
      if (c.partitionKey?.topLevelSite && site(c.partitionKey.topLevelSite) !== site(p.url)) continue;
      const { value, ...metadata } = c;
      cookies.set(cookieKey(c), { ...metadata, thirdParty: thirdParty(domain, p.url), newSinceBaseline: p.baselineReady ? !p.baseline.has(cookieKey(c)) : null });
      rememberCookie(p, value, domain);
    }
    p.cookies = [...cookies.values()];
  } catch (e) { if (!p.warnings.includes(e.message)) p.warnings.push(e.message); }
  const events = [...p.events, ...p.snapshots.values()];
  const report = { schemaVersion: 1, id: p.id, url: p.url, startedAt: p.startedAt, capturedAt: new Date().toISOString(), requests: p.requests.map(r => ({ ...r, thirdParty: thirdParty(r.domain, p.url) })), cookies: p.cookies, cookieAttempts: p.cookieAttempts.map(c => ({ ...c, thirdParty: thirdParty(c.domain, p.url) })), cookieChanges: p.cookieChanges, events, signals: [...p.signals, ...pollingEvidence(p.requests)], rules: [...rules], warnings: p.warnings, truncated: p.truncated, baselineReady: p.baselineReady, cookieBaselineNote: 'Snapshot assíncrono no início da navegação; cookies muito precoces podem entrar no baseline. Presença não prova injeção nesta página.' };
  report.score = scoreReport(report); return report;
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (sender.id !== browser.runtime.id) return;
  if (message.type === 'events' && sender.tab) {
    const p = pages.get(sender.tab.id); if (!p) return;
    if (sender.frameId === 0 && host(sender.url) !== host(p.url)) return;
    for (const raw of (Array.isArray(message.events) ? message.events : []).slice(0, 100)) {
      if (!raw || !['storage', 'canvas', 'hook', 'coverage', 'cookie-write', 'storage-snapshot'].includes(raw.kind)) continue;
      const e = { kind: raw.kind, api: String(raw.api || '').slice(0, 120), outcome: String(raw.outcome || '').slice(0, 60), detail: String(raw.detail || '').slice(0, 600), time: Number(raw.time) || Date.now(), frameId: sender.frameId, frameOrigin: new URL(sender.url).origin, thirdParty: thirdParty(sender.url, p.url) };
      if (e.time < p.startedMs) continue;
      if (e.kind === 'coverage' && e.outcome === 'limit') p.truncated = true;
      if (e.kind === 'storage-snapshot') { if (p.snapshots.size < LIMIT) p.snapshots.set(`${sender.frameId}:${e.api}`, e); else p.truncated = true; } else push(p, 'events', e);
    }
    return;
  }
  // Uma página interna aberta em aba também pode ter sender.tab no Firefox.
  // A autorização depende da origem moz-extension, não da presença de tab.
  if (!sender.url?.startsWith(browser.runtime.getURL(''))) return;
  await ready;
  if (message.type === 'report') { const p = pages.get(Number(message.tabId)); return p ? snapshot(p) : null; }
  if (message.type === 'rules') return rules;
  if (message.type === 'save-rules') {
    if (!Array.isArray(message.rules) || message.rules.length > 500) throw new Error('Máximo: 500 domínios.');
    const next = [...new Set(message.rules.map(normalizeRule))]; await browser.storage.local.set({ rules: next }); rules = next; return rules;
  }
});
browser.tabs.onRemoved.addListener(tabId => { pages.delete(tabId); journeys.delete(tabId); for (const [id, value] of requestPages) if (value.p.tabId === tabId) requestPages.delete(id); });
