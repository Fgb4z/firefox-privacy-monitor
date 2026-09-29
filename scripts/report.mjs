import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';
import { readFile, mkdir, access } from 'node:fs/promises';
import { finished } from 'node:stream/promises';
import { resolve } from 'node:path';
import { scoreReport } from '../src/core.js';

const final=process.argv.includes('--final');
const data=JSON.parse(await readFile('docs/relatorio/dados.json','utf8'));
const pending=[];
function requireText(value,label){if(typeof value!=='string'||!value.trim()||/\bPENDENTE\b/i.test(value))pending.push(label);}
async function requireFile(value,label){if(!value){pending.push(label);return;}try{await access(value);}catch{pending.push(`${label}: arquivo ausente (${value})`);}}
for(const k of ['author','environment','method'])requireText(data[k],k);
if(data.tests.length!==8)pending.push('Oito testes obrigatórios');
for(const t of data.tests){for(const k of ['expected','observed','explanation'])requireText(t[k],`${t.id}/${k}`);for(const k of ['screenshot','pluginJson','pageScreenshot','har'])await requireFile(t[k],`${t.id}/${k}`);}
if(data.sites.length!==3)pending.push('Três sites');
for(const s of data.sites){
 for(const k of ['url','scoreDiscussion'])requireText(s[k],`${s.id}/${k}`);
 for(const k of ['har','pluginJson','screenshot','pageScreenshot','blacklightEvidence','blacklightScreenshot','blacklightPage','ublockEvidence','ublockScreenshot'])await requireFile(s[k],`${s.id}/${k}`);
 try{s.score=scoreReport(JSON.parse(await readFile(s.pluginJson,'utf8'))).value;}catch{pending.push(`${s.id}/score`);}
 if(!s.reconciliation?.length)pending.push(`${s.id}/reconciliation`);
 for(const row of s.reconciliation||[])for(const k of ['explanation','evidence'])requireText(row[k],`${s.id}/${row.domain}/${k}`);
}
if(final&&pending.length){console.error(`Relatório final recusado: ${pending.length} pendências.\n${pending.join('\n')}`);process.exit(1);}
await mkdir('docs/relatorio',{recursive:true});
const output=`docs/relatorio/${final?'relatorio-final':'relatorio-rascunho'}.pdf`;
const doc=new PDFDocument({size:'A4',margin:46,bufferPages:true,info:{Title:data.title,Author:data.author}});
const stream=createWriteStream(output);doc.pipe(stream);
const W=503,bottom=775;
const clean=t=>String(t??'PENDENTE').replace(/→/g,' > ').replace(/−/g,'-');
function room(height){if(doc.y+height>bottom)doc.addPage();}
function heading(text){room(65);doc.font('Helvetica-Bold').fontSize(17).fillColor('#145d4d').text(clean(text),46,doc.y,{width:W});doc.moveDown(.55);}
function paragraph(text,size=10){doc.font('Helvetica').fontSize(size).fillColor('#20323b').text(clean(text),46,doc.y,{width:W,lineGap:3});doc.moveDown(.55);}
function table(headers,rows,widths,size=8.4){
 function row(cells,isHeader=false){
  doc.font(isHeader?'Helvetica-Bold':'Helvetica').fontSize(size);
  const values=cells.map(clean),height=Math.max(...values.map((v,i)=>doc.heightOfString(v,{width:widths[i]-12,lineGap:2})))+14;
  if(doc.y+height>bottom){doc.addPage();if(!isHeader)row(headers,true);}
  doc.font(isHeader?'Helvetica-Bold':'Helvetica').fontSize(size);
  const y=doc.y;let x=46;
  for(let i=0;i<values.length;i++){
   doc.rect(x,y,widths[i],height).fillAndStroke(isHeader?'#e3efeb':'#ffffff','#d3deda');
   doc.fillColor('#20323b').text(values[i],x+6,y+7,{width:widths[i]-12,lineGap:2});x+=widths[i];
  }
  doc.x=46;doc.y=y+height;
 }
 row(headers,true);for(const cells of rows)row(cells);doc.moveDown();
}
async function picture(path,caption,maxHeight=310){
 try{await access(path);}catch{paragraph(`Imagem ausente: ${path}`);return;}
 room(maxHeight+40);const y=doc.y;doc.image(path,46,y,{fit:[W,maxHeight],align:'center',valign:'top'});doc.y=y+maxHeight+6;paragraph(caption,8);
}
heading(data.title);paragraph(final?'Relatório de execução e análise':'RASCUNHO');
paragraph(`${data.author}\nEntrega: ${data.deadline}\nColetas: 28/09/2026 (America/Sao_Paulo)\nGerado em: ${new Date().toISOString()}`);
paragraph('Repositório: https://github.com/Fgb4z/firefox-privacy-monitor');
paragraph('Extensão Firefox que observa conexões, cookies, armazenamento HTML5, canvas e indícios de sincronização, bounce e alterações de objetos. O trabalho reúne oito testes DDG, três análises de sites e um score didático. Detectado significa o comportamento observado, não um diagnóstico de ataque ou certificação de privacidade.');
heading('Resultados principais');
table(['Site','Score / 100','Hosts terceiros (M)','BL: rastreadores / cookies','uBlock: hosts bloqueados'],data.sites.map(s=>[s.name,s.score,s.summary.thirdPartyHosts,`${s.summary.blacklightTrackers} / ${s.summary.blacklightCookies}`,s.summary.ublockBlockedHosts]),[115,70,94,125,99]);
paragraph('M: monitor sozinho. BL: Blacklight. Hosts terceiros incluem recursos legítimos; as colunas medem grandezas diferentes. uBlock agrupa hosts com ações de bloqueio/redirecionamento, sem tratar linhas repetidas como rastreadores adicionais.');
paragraph('Limitação central: o Blacklight recebeu uma página de erro na Magazine Luiza e navegou também ao atendimento. Sua contagem reduzida não descreve o carregamento normal observado no Firefox. Na Wikipédia, a nota 68 penaliza cookies e infraestrutura entre domínios Wikimedia, apesar de não haver rastreadores publicitários classificados.');
paragraph(data.selectionNote);
doc.addPage();heading('1. Implementação, ambiente e método');paragraph(data.environment);paragraph(data.method);
table(['Componente','Função e evidência no repositório'],[
 ['src/background.js','webRequest e cookies: pedidos por aba, Set-Cookie, inventário, correlação, bounce, bloqueio por domínio. Pedidos sem tabId também obedecem à regra global.'],
 ['src/content.js','document_start e all_frames: wrappers exportados pelo Firefox para Storage, IndexedDB, canvas e document.cookie; comparação periódica de referências.'],
 ['src/core.js','Public Suffix List, catálogo demonstrativo, redação de URLs e score.'],
 ['src/report.js + extension/ui','Relatório por aba, cookies, indícios, parcelas do score, regras persistentes e exportação JSON.'],
 ['tests/ e evidencias/locais','Testes de lógica/integração e fixture sintética no Firefox, separados dos testes DDG e sites.']
],[125,378]);
paragraph('Instalação: Firefox 142+, about:debugging#/runtime/this-firefox, Carregar extensão temporária, selecionar extension/manifest.json. Os bundles acompanham o repositório. Recarregar a página; clicar Privacy Monitor e Abrir painel. Em Sua lista de bloqueio, salvar um domínio por linha e recarregar a página.');
doc.addPage();heading('2. Score e limites de interpretação');
paragraph('Score = máximo(0, 100 - soma das penalidades). Maior é melhor. Versão 1.0. Pesos didáticos, sem calibração estatística. A comparação com Blacklight é por comportamento, sem converter seus cartões em uma nota equivalente.');
const reasons=['Mais destinatários potenciais','Contexto do catálogo conhecido','Persistência favorece vínculo temporal','Estado acessível em contexto terceiro','Leitura pode compor identificação','Possível transporte de identificadores','Mudanças/canais exigem investigação'];
table(['Categoria','Regra e teto','Justificativa'],scoreReport({}).rows.map((r,i)=>[r.label,r.rule,reasons[i]]),[168,185,150]);
paragraph('A decisão primeira/terceira parte usa o domínio registrável (PSL). A contagem das parcelas de rede usa hosts distintos com HTTP 200–399, sem erro ou bloqueio. A reconciliação agrupa hosts por domínio registrável, preservando cada host no JSON. Organização e domínio não são equivalentes.');
paragraph('Cookies: separar tentativas HTTP, tentativas JavaScript, inventário presente e identidades novas desde baseline. Set-Cookie não prova aceitação; o snapshot inicial assíncrono pode incluir cookies precoces. Atualização/expiração gera tentativa, não um novo cookie. Identidades incluem nome, domínio, path, store e partição.');
paragraph('Storage observado não prova isolamento; retorno normal de IndexedDB não comprova conclusão assíncrona. Não há bloqueio de storage, canvas ou remoção de parâmetros. Canvas legítimo também reduz a nota. Cookie sync compara valores opacos iguais sem provar intenção. Bounce pode ser login/pagamento. Hooks, polling e WebSocket não provam sequestro.');
paragraph('Workers não recebem instrumentação de APIs; seu tráfego de rede pode ser bloqueado. Eventos sem tabId não são atribuídos arbitrariamente a uma aba. Catálogo pequeno, CNAME, transformações de identificadores, alterações anteriores à baseline e contextos não injetáveis limitam a cobertura. A lista de bloqueio é independente do catálogo. Detalhes: docs/METODOLOGIA.md.');
doc.addPage();heading('3. Matriz dos testes DuckDuckGo');
table(['Teste','Esperado da página','Resultado observado','Explicação da divergência'],[
 ['Tracker Reporting','1 rastreador por script','doubleclick.net identificado; 404','Tentativa reconhecida; script não carregou.'],
 ['Storage blocking','Gravar/recuperar em múltiplos contextos','23 mecanismos; 2 falhas no resumo','WebSQL ausente; CookieStore falhou; monitor observa APIs.'],
 ['Fingerprinting','Coletar pontos de fingerprint','124 pontos; 14 falhas; 5 leituras canvas','Falhas de APIs não equivalem a proteção; canvas detectado.'],
 ['Bounce tracking','Passagem por terceiro com ID','A > B > A; 604 ms; ID novo','Padrão detectado; sem prova de reuso de ID prévio.'],
 ['Query parameters','Restar q=other se houver remoção','utm_source permaneceu e foi sinalizado','Monitor detecta parâmetro; não reescreve URL.'],
 ['Tracker Blocking','Impedir bad.third-party.site','23 mecanismos sem carregar; 22 cancelamentos atribuídos','Controle permite 22; WebSocket falha também sem regra.'],
 ['Storage partitioning','Isolamento/bloqueio cross-site','19 pass, 1 unsupported, 1 error','Prefetch divergiu; isolamento medido pela página.'],
 ['js-leaks','Comparar objetos à referência','13 diferenças adicionais com monitor','Wrappers próprios; controle já difere do Firefox 92.']
],[93,122,137,151]);
paragraph('Cada linha é detalhada a seguir e acompanhada de prints reais da página e do monitor, HAR e JSON. Os oito testes representam os fluxos descritos, não todas as variantes existentes no DDG.');
for(const t of data.tests){
 doc.addPage();heading(`3.${data.tests.indexOf(t)+1}. ${t.name}`);paragraph(t.url,9);
 paragraph(`Procedimento: ${t.procedure}`);paragraph(`Esperado informado pela página: ${t.expected}`);paragraph(`Observado: ${t.observed}`);paragraph(`Explicação e evidências: ${t.explanation}`);
 paragraph(`Coleta UTC: ${t.execution.startedAt} a ${t.execution.completedAt}.\nArquivos: ${t.pluginJson}; ${t.har}; mesma pasta: pagina.txt, pagina-resultados.json e execucao.json.`,8);
 if(t.mechanisms){doc.addPage();heading('Tracker Blocking: controle por mecanismo');table(['Mecanismo','Sem regra','Com regra'],t.mechanisms.map(r=>[r.id,r.before,r.after]),[303,100,100]);paragraph('WebSocket já falhou no controle; apenas o cancelamento da tentativa é atribuível à lista. Nos outros 22 mecanismos, o estado mudou de loaded para not loaded/failed.');}
 doc.addPage();heading(`${t.name}: capturas da execução`);
 await picture(t.screenshot,'Monitor em execução, com a URL da página observada. '+t.screenshot);
 await picture(t.pageScreenshot,'Página na mesma coleta; detalhes completos nos arquivos TXT/JSON. '+t.pageScreenshot,290);
}
doc.addPage();heading('4. Análise dos três sites');
paragraph(`Condições M, U e B separadas. Comparar cada domínio na união de pedidos, logger e cartões. Rótulos publicitários, presença de cookies e mera conexão são medidas diferentes. A reconciliação inclui ${data.sites.reduce((n,s)=>n+s.reconciliation.length,0)} grupos de domínios registráveis, inclusive recursos não classificados como rastreadores. Downloads de listas feitos pelo próprio uBlock (contexto moz-extension-scheme no logger) foram excluídos da análise da página. Aliases DNS permanecem, com o URL original indicado no campo aliasURL.`);
paragraph('Índices log.entries[N] referem-se ao HAR indicado, com base zero. Linhas do logger começam em 1. Categorias Blacklight: ddg_join_ads = rastreadores publicitários; cookies = cookies terceiros; session_recorders = bibliotecas de gravação de sessão. Ausência no logger não significa decisão explícita de permitir. reconciliacao.json preserva hosts, pedidos e regras completos.');
paragraph('Os totais monitor/HAR não são equivalentes: o HAR foi exportado antes de abrir/capturar o painel do monitor, permitindo recursos tardios entre as capturas. HAR com persistência também pode incluir navegações anteriores ao estado final do monitor. A análise confronta recursos concretos, não subtrai apenas os totais.');
for(const s of data.sites){
 doc.addPage();heading(`4.${data.sites.indexOf(s)+1}. ${s.name}`);paragraph(s.url);paragraph(`Score: ${s.score}/100. ${s.scoreDiscussion}`);
 table(['Métrica','Resultado'],[
  ['Pedidos monitor / entradas HAR',`${s.summary.requests} / ${s.summary.harEntries}`],['Hosts terceiros contatados',s.summary.thirdPartyHosts],['Cookies presentes / terceiros',`${s.summary.cookies} / ${s.summary.thirdPartyCookies}`],['Blacklight: rastreadores / cookies terceiros',`${s.summary.blacklightTrackers} / ${s.summary.blacklightCookies}`],['uBlock: linhas --/<< / hosts distintos',`${s.summary.ublockBlockedLogRows} / ${s.summary.ublockBlockedHosts}`]
 ],[300,203]);
 table(['Parcela do score','Penalidade'],s.penalties.map(r=>[r.label,r.penalty]),[403,100]);
 room(180);heading('Cookies: inventário e operações HTTP');
 table(['Parte','Duração','Presentes','Tentativas Set-Cookie'],s.cookieBreakdown.map(r=>[r.party,r.duration,r.present,r.httpAttempts]),[140,120,93,150]);
 paragraph('Tentativas incluem atualizações e exclusões; não são cookies únicos nem comprovadamente aceitos. Chamadas JavaScript estão separadas em events[kind=cookie-write]. Presença e partição estão em monitor.json/cookies.');
 paragraph(`M: ${s.conditions.monitor.startedAt} a ${s.conditions.monitor.completedAt}; U: ${s.conditions.ublock.startedAt} a ${s.conditions.ublock.completedAt}; B: ${s.conditions.blacklight.startedAt} a ${s.conditions.blacklight.endedAt}. Horários UTC.`,8);
 paragraph(`Fontes: ${s.har}; ${s.pluginJson}; ${s.blacklightEvidence}; ${s.ublockEvidence}. Demais arquivos de comparação na mesma pasta.`,8);
 doc.addPage();heading(`${s.name}: Firefox com monitor`);await picture(s.screenshot,'Painel do monitor e URL observada.');await picture(s.pageScreenshot,'Página carregada na condição M.',290);
 doc.addPage();heading(`${s.name}: ferramentas de referência`);await picture(s.blacklightScreenshot,'Interface oficial Blacklight. Dados completos em blacklight-resultados.json.');await picture(s.ublockScreenshot,'Logger real do uBlock na condição U; regras e ações em ublock-logger.txt.',290);
 if(s.id==='site-2'){doc.addPage();heading('Magazine Luiza: página recebida pelo Blacklight');await picture(s.blacklightPage,'Imagem oficial do arquivo Blacklight: a loja retornou erro. Não corresponde à página normal vista pelo Firefox.',530);paragraph('O histórico registra também navegação ao atendimento, com recursos no HAR Blacklight. Isso limita a comparação, mesmo com status success na API da ferramenta.');}
 doc.addPage();heading(`${s.name}: reconciliação por domínio`);
 for(const row of s.reconciliation){
  room(160);doc.font('Helvetica-Bold').fontSize(11).fillColor('#145d4d').text(row.domain,46,doc.y,{width:W});doc.moveDown(.3);
  paragraph(`M: ${row.plugin}. B: ${row.blacklight}. U: ${row.ublock}.`,8.5);
  paragraph(row.explanation,8.5);paragraph(`Evidência: ${row.evidence}. Hosts: ${row.hosts.join(', ')}.`,8);
 }
}
doc.addPage();heading('5. Conclusões e reprodutibilidade');
paragraph('As coletas demonstram conexões externas, distinção de cookies, chamadas de armazenamento e canvas, bounce e bloqueio personalizado. O monitor não implementa todas as proteções avaliadas pelo DDG. O js-leaks evidencia a própria instrumentação; indicadores de hook não são diagnóstico de comprometimento.');
paragraph('O score concorda com a alta exposição publicitária da BBC, mas penaliza infraestrutura legítima na Wikipédia. A coleta Blacklight da Magazine Luiza é limitada pela página de erro. Para domínios presentes em apenas uma amostra, os registros comprovam a diferença; quando não permitem isolar a causa, a incerteza é declarada no item correspondente. Não foi inventada uma explicação causal para satisfazer a comparação.');
paragraph('Reprodução: npm ci; npm run check; npm run test:browser. Coletas: scripts/collect-ddg.mjs, collect-sites.mjs, collect-ublock.mjs e collect-blacklight.mjs. Resultados variam com tempo e ambiente. Consolidação: scripts/prepare-report-data.mjs; npm run report -- --final. Roteiro em docs/VALIDACAO.md e checklist em docs/ENTREGA.md.');
paragraph('Commits incrementais reais devem permanecer no Git. Este PDF não certifica a distribuição do trabalho ao longo da semana nem a atribuição de conceito pelo professor.');
heading('Referências e materiais');
for(const url of ['https://github.com/Fgb4z/firefox-privacy-monitor','https://github.com/duckduckgo/privacy-test-pages','https://www.first-party.site/','https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions','https://themarkup.org/blacklight','https://github.com/gorhill/uBlock','https://publicsuffix.org/list/'])paragraph(url,9);
paragraph('Enunciado: Avaliacao_Intermediaria_Ciberseguranca.pdf, João Eduardo Luisi, Insper. Seleção livre dos sites e prazo de 29/09 informados pelo aluno.');
if(pending.length){heading(`Pendências (${pending.length})`);pending.forEach(p=>paragraph(p));}
const range=doc.bufferedPageRange();for(let i=0;i<range.count;i++){doc.switchToPage(i);doc.font('Helvetica').fontSize(8).fillColor('#60747c').text(`${final?'FINAL':'RASCUNHO'} | Fernando Guerra Boni | Privacy Monitor | ${i+1}/${range.count}`,46,803,{lineBreak:false});}
doc.end();await finished(stream);console.log(`${resolve(output)}\n${range.count} páginas; ${pending.length} pendências de preenchimento.`);
