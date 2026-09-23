import { getDomain } from 'tldts';

export function host(url) { try { return new URL(url).hostname.toLowerCase().replace(/\.$/, ''); } catch { return ''; } }
export function site(value) { const h = value.includes('://') ? host(value) : value.replace(/^\./, '').toLowerCase(); return getDomain(h, { allowPrivateDomains: true }) || h; }
export function thirdParty(a, b) { return Boolean(site(a) && site(b) && site(a) !== site(b)); }
export function normalizeRule(value) {
  const input = String(value).trim().toLowerCase();
  if (!input || /[\s/*?#@:]/.test(input)) throw new Error('Informe somente um domínio, sem protocolo, porta, caminho ou curinga.');
  const h = host(`https://${input}`);
  if (!h || h !== input.replace(/\.$/, '') || (!h.includes('.') && h !== 'localhost')) throw new Error('Domínio inválido.');
  return h;
}
export function blockedBy(domain, rules) { return rules.find(r => domain === r || domain.endsWith(`.${r}`)) || null; }
// Lista demonstrativa: correspondência exata/sufixo, não um catálogo completo de rastreadores.
const trackers = { 'doubleclick.net': 'Google Ads', 'google-analytics.com': 'Google Analytics', 'googlesyndication.com': 'Google Ads', 'facebook.net': 'Meta SDK', 'connect.facebook.com': 'Meta', 'scorecardresearch.com': 'Comscore', 'criteo.com': 'Criteo', 'hotjar.com': 'Hotjar', 'tracker.third-party.site': 'DuckDuckGo: rastreador de teste' };
export function trackerName(domain) { const rule = blockedBy(domain, Object.keys(trackers)); return rule ? trackers[rule] : null; }
export const TRACKING_PARAM = /^(?:utm_.+|fbclid|gclid|dclid|msclkid|ttclid|mc_eid|_ga|uid|user_?id|visitor_?id|cookie_?id|cid|sync_?id)$/i;
export function querySignals(url) { try { return [...new URL(url).searchParams.keys()].filter(k => TRACKING_PARAM.test(k)); } catch { return []; } }
export function safeUrl(url) {
  try { const u = new URL(url); u.username = ''; u.password = ''; u.hash = ''; const keys = [...new Set(u.searchParams.keys())]; u.search = ''; for (const key of keys) u.searchParams.append(key, '[redigido]'); return u.href; } catch { return ''; }
}
export function parseSetCookie(header, url) {
  const parts = header.split(';').map(v => v.trim()); const split = parts[0].indexOf('=');
  if (split < 1) return null;
  const attrs = Object.fromEntries(parts.slice(1).map(p => { const i = p.indexOf('='); return [p.slice(0, i < 0 ? undefined : i).toLowerCase(), i < 0 ? true : p.slice(i + 1)]; }));
  return { name: parts[0].slice(0, split), domain: String(attrs.domain || host(url)).replace(/^\./, ''), path: attrs.path || '/', session: !('expires' in attrs || 'max-age' in attrs), secure: Boolean(attrs.secure), httpOnly: Boolean(attrs.httponly), partitioned: Boolean(attrs.partitioned), deletion: Number(attrs['max-age']) <= 0 || (attrs.expires && Date.parse(attrs.expires) <= Date.now()) || false };
}
export function cookieKey(c) { return JSON.stringify([c.domain.replace(/^\./, ''), c.path, c.name, c.storeId || '', c.firstPartyDomain || '', c.partitionKey || null]); }
export function pollingEvidence(requests) {
  const groups = new Map();
  for (const r of requests.filter(r => r.thirdParty && !r.blocked && ['xmlhttprequest', 'ping'].includes(r.type))) {
    const key = r.url.split('?')[0]; const list = groups.get(key) || []; list.push(r.time); groups.set(key, list);
  }
  return [...groups].filter(([, ts]) => ts.length >= 6 && Math.max(...ts) - Math.min(...ts) >= 10000).map(([url, ts]) => ({ kind: 'polling', url, count: ts.length, spanMs: Math.max(...ts) - Math.min(...ts), confidence: 'baixa' }));
}
export function scoreReport(report) {
  const requests = report.requests || [], cookies = report.cookies || [], signals = report.signals || [], events = report.events || [];
  const delivered = requests.filter(r => !r.blocked && !r.error && r.status >= 200 && r.status < 400);
  const count = pred => new Set(delivered.filter(pred).map(r => r.domain)).size;
  const rows = [
    ['thirdParty', 'Conexões externas respondidas', Math.min(15, count(r => r.thirdParty) * 3), '3 por domínio; teto 15'],
    ['trackers', 'Domínios do catálogo demonstrativo respondidos', Math.min(20, count(r => r.thirdParty && r.tracker) * 5), '5 por domínio; teto 20'],
    ['cookies', 'Cookies terceiros presentes', Math.min(20, cookies.filter(c => c.thirdParty).reduce((s, c) => s + (c.session ? 2 : 4), 0)), '2 sessão / 4 persistente; teto 20'],
    ['storage', 'Armazenamento terceiro acessado', Math.min(10, new Set(events.filter(e => e.kind === 'storage' && e.thirdParty && e.outcome === 'success').map(e => `${e.frameOrigin}:${e.api.split('.')[0]}`)).size * 2), '2 por origem e API; teto 10'],
    ['canvas', 'Leitura de canvas', events.some(e => e.kind === 'canvas' && e.outcome === 'success') ? 10 : 0, '10 se observada; pode ser legítima'],
    ['sync', 'Correlação de identificador / bounce', Math.min(15, (signals.some(e => e.kind === 'cookie-sync') ? 10 : 0) + (signals.some(e => e.kind === 'bounce') ? 5 : 0)), '10 correlação + 5 bounce; teto 15'],
    ['hook', 'Indicadores de hook ou canal persistente', Math.min(10, (signals.some(e => ['polling', 'websocket'].includes(e.kind)) ? 5 : 0) + (events.some(e => e.kind === 'hook') ? 5 : 0)), '5 comunicação + 5 alteração; teto 10']
  ].map(([id, label, penalty, rule]) => ({ id, label, penalty, rule }));
  return { value: Math.max(0, 100 - rows.reduce((s, r) => s + r.penalty, 0)), rows, version: '1.0', meaning: '100 = menor exposição observada; não certifica segurança ou ausência de rastreamento.' };
}
