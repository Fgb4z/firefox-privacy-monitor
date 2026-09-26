import { readFile, writeFile } from 'node:fs/promises';
import { host, safeUrl } from '../src/core.js';
export function reconcile(har, plugin, blacklight = [], ublock = []) {
  if (!Array.isArray(har.log?.entries)) throw new Error('HAR inválido: log.entries ausente.');
  const domains = new Map();
  const get = domain => { if (!domains.has(domain)) domains.set(domain, { domain, har: [], plugin: [], blacklight: [], ublock: [], explanation: 'PENDENTE: vincular cada divergência a evidências concretas; não inferir causa somente pela ausência.' }); return domains.get(domain); };
  har.log.entries.forEach((e, index) => { const domain = host(e.request?.url); if (domain) get(domain).har.push({ entry: index, startedDateTime: e.startedDateTime, method: e.request.method, url: safeUrl(e.request.url), status: e.response?.status, redirectURL: safeUrl(e.response?.redirectURL || ''), initiator: e._initiator?.type || null }); });
  for (const r of plugin.requests || []) get(r.domain).plugin.push({ requestId: r.id, url: r.url, status: r.status, blocked: r.blocked, tracker: r.tracker, error: r.error });
  for (const [name, list] of [['blacklight', blacklight], ['ublock', ublock]]) {
    if (!Array.isArray(list)) throw new Error(`${name}: use lista JSON normalizada [{domain, evidence, ...}].`);
    for (const entry of list) { if (!entry.domain || typeof entry.evidence !== 'string' || !entry.evidence.trim()) throw new Error(`${name}: cada linha precisa de domain e evidence.`); get(entry.domain.toLowerCase())[name].push(entry); }
  }
  return [...domains.values()].sort((a,b) => a.domain.localeCompare(b.domain));
}

if (process.argv[1]?.endsWith('compare-har.mjs')) {
  const [harPath, pluginPath, blacklightPath, ublockPath, output = 'reconciliacao.json'] = process.argv.slice(2);
  if (!harPath || !pluginPath) { console.error('Uso: node scripts/compare-har.mjs site.har plugin.json [blacklight.json] [ublock.json] [saida.json]'); process.exitCode = 1; }
  else {
    const read = async path => JSON.parse(await readFile(path, 'utf8'));
    const result = reconcile(await read(harPath), await read(pluginPath), blacklightPath ? await read(blacklightPath) : [], ublockPath ? await read(ublockPath) : []);
    await writeFile(output, JSON.stringify({ generatedAt: new Date().toISOString(), warning: 'Tabela de apoio. Reconciliar execuções separadas por horário, consentimento, cache e proteção; todos os motivos precisam de revisão humana.', domains: result }, null, 2));
    console.log(`Reconciliação de ${result.length} domínios: ${output}`);
  }
}
