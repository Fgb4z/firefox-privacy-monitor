import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { readFile, mkdir, access } from 'node:fs/promises';
import { finished } from 'node:stream/promises';
import { resolve, extname } from 'node:path';
import { scoreReport } from '../src/core.js';

const final = process.argv.includes('--final');
const data = JSON.parse(await readFile('docs/relatorio/dados.json', 'utf8'));
const pending = [], evidence = new Map();
function requireText(value, label) { if (typeof value !== 'string' || !value.trim() || /PENDENTE/i.test(value)) pending.push(label); }
async function requireFile(value, label) { if (!value) { pending.push(label); return; } try { await access(value); evidence.set(label, value); } catch { pending.push(`${label}: arquivo ausente (${value})`); } }
for (const key of ['author','registration','environment']) requireText(data[key], key);
if (data.tests.length < 8) pending.push('Oito testes obrigatórios');
for (const t of data.tests) { for (const key of ['expected','observed','explanation']) requireText(t[key], `${t.id}/${key}`); await requireFile(t.screenshot, `${t.id}/screenshot`); await requireFile(t.pluginJson, `${t.id}/pluginJson`); }
if (data.sites.length !== 3) pending.push('Três sites sorteados');
for (const s of data.sites) {
  requireText(s.url, `${s.id}/url`); requireText(s.scoreDiscussion, `${s.id}/scoreDiscussion`);
  for (const key of ['har','pluginJson','screenshot','blacklightEvidence','ublockEvidence']) await requireFile(s[key], `${s.id}/${key}`);
  if (evidence.has(`${s.id}/pluginJson`)) { const report = JSON.parse(await readFile(s.pluginJson,'utf8')); s.score = scoreReport(report).value; }
  if (!Number.isFinite(s.score)) pending.push(`${s.id}/score`);
  if (!s.reconciliation.length) pending.push(`${s.id}/reconciliation`);
  for (const row of s.reconciliation) { requireText(row.explanation, `${s.id}/${row.domain}/explanation`); requireText(row.evidence, `${s.id}/${row.domain}/evidence`); }
}
if (final && pending.length) { console.error(`Relatório final recusado: ${pending.length} pendências.\n${pending.join('\n')}`); process.exitCode = 1; }
else {
  await mkdir('docs/relatorio', { recursive:true });
  const output = `docs/relatorio/${final ? 'relatorio-final' : 'relatorio-rascunho'}.pdf`;
  const doc = new PDFDocument({ size:'A4', margin:46, bufferPages:true, info:{Title:data.title,Author:data.author} });
  const stream = createWriteStream(output); doc.pipe(stream);
  const heading = text => { doc.moveDown(.6).font('Helvetica-Bold').fontSize(17).fillColor('#145d4d').text(text); doc.moveDown(.4); };
  const paragraph = text => doc.font('Helvetica').fontSize(10).fillColor('#20323b').text(String(text ?? 'PENDENTE'), { lineGap:4 }).moveDown(.5);
  heading(data.title); paragraph(final ? 'Relatório final' : 'RASCUNHO — coleta e análise empírica ainda incompletas');
  paragraph(`Autor: ${data.author}\nMatrícula: ${data.registration}\nEntrega: ${data.deadline}\nGerado em: ${new Date().toISOString()}`);
  paragraph('Este documento não declara aprovação nos testes DDG nem resultados dos três sites enquanto as respectivas evidências não forem coletadas. Testes automatizados com dados sintéticos não substituem HARs e prints obrigatórios.');
  heading('Ambiente e método'); paragraph(data.environment);
  paragraph('Comparar execuções controladas: monitor sozinho, uBlock Origin separadamente e Blacklight com horário registrado. Manter condições de consentimento, região, cache e interação documentadas. HARs devem vir do DevTools. Usar URL, domínio, horário, status, parâmetros e iniciador para fundamentar cada divergência.');
  heading('Metodologia do score');
  paragraph('Score = máximo(0, 100 - soma das penalidades). Maior é melhor. Versão 1.0. Mede exposição observada, não probabilidade de ataque; pesos são escolhas didáticas e não foram calibrados estatisticamente.');
  for (const r of scoreReport({}).rows) paragraph(`${r.label}: ${r.rule}.`);
  paragraph('Justificativa: terceiros ampliam compartilhamento (15); classificação conhecida adiciona contexto (20); cookies persistentes favorecem vínculo temporal (20); storage terceiro permite estado adicional (10); canvas pode compor identificação (10); correlação/bounce sugere transporte de identificadores (15); alterações/canais exigem investigação (10). A acumulação entre categorias é intencional. APIs legítimas podem baixar o score; o catálogo pequeno e lacunas de cobertura podem elevá-lo artificialmente.');
  paragraph('Limites: presença de cookie não prova injeção; baseline assíncrono pode conter cookies precoces; Set-Cookie é tentativa. Storage observado não prova particionamento, IndexedDB pode falhar assincronamente. Canvas não comprova fingerprinting. WebSocket/polling e hooks não comprovam hijacking. Workers, CNAME cloaking, valores transformados e técnicas não instrumentadas podem escapar. Blacklight usa métricas e ambiente próprios: comparar comportamentos por categoria, sem converter seu resultado em nota equivalente.');
  for (const t of data.tests) {
    doc.addPage(); heading(`Teste: ${t.name}`); paragraph(t.url); paragraph(`Procedimento: ${t.procedure}`); paragraph(`Esperado informado pela página: ${t.expected}`); paragraph(`Observado pelo monitor: ${t.observed}`); paragraph(`Explicação técnica / referências: ${t.explanation}`); paragraph(`JSON: ${t.pluginJson || 'PENDENTE'}`);
    if (evidence.has(`${t.id}/screenshot`) && ['.png','.jpg','.jpeg'].includes(extname(t.screenshot).toLowerCase())) { if (doc.y > 430) doc.addPage(); doc.image(t.screenshot, { fit:[490,300] }); } else paragraph('Print do monitor nesta página: PENDENTE');
  }
  for (const s of data.sites) {
    doc.addPage(); heading(`${s.id}: ${s.url}`); paragraph(`Score: ${s.score ?? 'PENDENTE'} / 100`); paragraph(`Comparação crítica com Blacklight: ${s.scoreDiscussion}`);
    for (const key of ['har','pluginJson','screenshot','blacklightEvidence','ublockEvidence']) paragraph(`${key}: ${s[key] || 'PENDENTE'}`);
    for (const row of s.reconciliation) paragraph(`${row.domain}\nMonitor: ${row.plugin ?? 'PENDENTE'}; Blacklight: ${row.blacklight ?? 'PENDENTE'}; uBlock: ${row.ublock ?? 'PENDENTE'}\nExplicação: ${row.explanation}\nEvidência: ${row.evidence}`);
    if (evidence.has(`${s.id}/screenshot`) && ['.png','.jpg','.jpeg'].includes(extname(s.screenshot).toLowerCase())) { if (doc.y > 430) doc.addPage(); doc.image(s.screenshot, { fit:[490,300] }); }
  }
  doc.addPage(); heading('Referências e materiais');
  for (const url of ['https://github.com/duckduckgo/privacy-test-pages','https://www.first-party.site/','https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions','https://themarkup.org/blacklight','https://github.com/gorhill/uBlock','https://publicsuffix.org/list/']) paragraph(url);
  if (pending.length) { heading(`Pendências (${pending.length})`); for (const p of pending) paragraph(p); }
  const range = doc.bufferedPageRange(); for(let i=0;i<range.count;i++){ doc.switchToPage(i); doc.fontSize(8).fillColor('#60747c').text(`${final ? 'FINAL' : 'RASCUNHO'} | Privacy Monitor | ${i+1}/${range.count}`,46,800,{lineBreak:false}); }
  doc.end(); await finished(stream); console.log(`${resolve(output)}\n${pending.length} pendências de entrega.`);
}
