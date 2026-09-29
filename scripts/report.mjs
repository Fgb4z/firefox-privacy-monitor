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
const W=503,bottom=775,toc=[];
let figure=0;
const clean=t=>String(t??'PENDENTE').replace(/→/g,' > ').replace(/−/g,'-');
function room(height){if(doc.y+height>bottom)doc.addPage();}
function heading(text){room(50);doc.font('Helvetica-Bold').fontSize(15).fillColor('#145d4d').text(clean(text),46,doc.y,{width:W});doc.moveDown(.45);}
function section(text){toc.push({text,page:doc.bufferedPageRange().count});heading(text);}
function paragraph(text,size=9.3){doc.font('Helvetica').fontSize(size).fillColor('#20323b').text(clean(text),46,doc.y,{width:W,lineGap:2});doc.moveDown(.45);}
function table(headers,rows,widths,size=8.4){
 function row(cells,isHeader=false){
  doc.font(isHeader?'Helvetica-Bold':'Helvetica').fontSize(size);
  const values=cells.map(clean),height=Math.max(...values.map((v,i)=>doc.heightOfString(v,{width:widths[i]-12,lineGap:2})))+10;
  if(doc.y+height>bottom){doc.addPage();if(!isHeader)row(headers,true);}
  doc.font(isHeader?'Helvetica-Bold':'Helvetica').fontSize(size);
  const y=doc.y;let x=46;
  for(let i=0;i<values.length;i++){
   doc.rect(x,y,widths[i],height).fillAndStroke(isHeader?'#e3efeb':'#ffffff','#d3deda');
   doc.fillColor('#20323b').text(values[i],x+6,y+5,{width:widths[i]-12,lineGap:2});x+=widths[i];
  }
  doc.x=46;doc.y=y+height;
 }
 row(headers,true);for(const cells of rows)row(cells);doc.moveDown();
}
async function picture(path,caption,maxHeight=310){
 try{await access(path);}catch{paragraph(`Imagem ausente: ${path}`);return;}
 const img=doc.openImage(path),height=Math.min(maxHeight,W*img.height/img.width);
 room(height+40);const y=doc.y;doc.image(img,46,y,{fit:[W,height],align:'center',valign:'top'});doc.y=y+height+5;paragraph(`Figura ${++figure}. ${caption}`,8);
}
heading(data.title);paragraph(final?'Relatório de execução e análise':'RASCUNHO');
paragraph(`${data.author}\nEntrega: ${data.deadline}\nColetas: 28/09/2026 (America/Sao_Paulo)`);
paragraph('Repositório: https://github.com/Fgb4z/firefox-privacy-monitor');
paragraph('Extensão Firefox que observa conexões, cookies, armazenamento HTML5, canvas e indícios de sincronização, bounce e alterações de objetos. O trabalho reúne oito testes DDG, três análises de sites e um score didático. Detectado significa o comportamento observado, não um diagnóstico de ataque ou certificação de privacidade.');
heading('Resultados principais');
table(['Site','Score / 100','Hosts terceiros (M)','BL: rastreadores / cookies','uBlock: hosts bloqueados'],data.sites.map(s=>[s.name,s.score,s.summary.thirdPartyHosts,`${s.summary.blacklightTrackers} / ${s.summary.blacklightCookies}`,s.summary.ublockBlockedHosts]),[115,70,94,125,99]);
paragraph('M: monitor sozinho. BL: Blacklight. Hosts terceiros incluem recursos legítimos; as colunas medem grandezas diferentes. uBlock agrupa hosts com ações de bloqueio/redirecionamento, sem tratar linhas repetidas como rastreadores adicionais.');
paragraph('Limitação central: o Blacklight recebeu uma página de erro na Magazine Luiza e navegou também ao atendimento. Sua contagem reduzida não descreve o carregamento normal observado no Firefox. Na Wikipédia, a nota 68 penaliza cookies e infraestrutura entre domínios Wikimedia, apesar de não haver rastreadores publicitários classificados.');
paragraph(data.selectionNote);
doc.addPage();const tocPage=doc.bufferedPageRange().count-1;
doc.addPage();section('1. Implementação, ambiente e método');paragraph(data.environment);paragraph(data.method);
table(['Componente','Função e evidência no repositório'],[
 ['src/background.js','webRequest e cookies: pedidos por aba, Set-Cookie, inventário, correlação, bounce, bloqueio por domínio. Pedidos sem tabId também obedecem à regra global.'],
 ['src/content.js','document_start e all_frames: wrappers exportados pelo Firefox para Storage, IndexedDB, canvas e document.cookie; comparação periódica de referências.'],
 ['src/core.js','Public Suffix List, catálogo demonstrativo, redação de URLs e score.'],
 ['src/report.js + extension/ui','Relatório por aba, cookies, indícios, parcelas do score, regras persistentes e exportação JSON.'],
 ['tests/ e evidencias/locais','Testes de lógica/integração e fixture sintética no Firefox, separados dos testes DDG e sites.']
],[125,378]);
paragraph('Instalação: Firefox 142+, about:debugging#/runtime/this-firefox, Carregar extensão temporária, selecionar extension/manifest.json. Os bundles acompanham o repositório. Recarregar a página; clicar Privacy Monitor e Abrir painel. Em Sua lista de bloqueio, salvar um domínio por linha e recarregar a página.');
doc.addPage();section('2. Score e limites de interpretação');
paragraph('Score = máximo(0, 100 - soma das penalidades). Maior é melhor. Versão 1.0. Pesos didáticos, sem calibração estatística. A comparação com Blacklight é por comportamento, sem converter seus cartões em uma nota equivalente.');
const reasons=['Mais destinatários potenciais','Contexto do catálogo conhecido','Persistência favorece vínculo temporal','Estado acessível em contexto terceiro','Leitura pode compor identificação','Possível transporte de identificadores','Mudanças/canais exigem investigação'];
table(['Categoria','Regra e teto','Justificativa'],scoreReport({}).rows.map((r,i)=>[r.label,r.rule,reasons[i]]),[168,185,150]);
paragraph('A decisão primeira/terceira parte usa o domínio registrável (PSL). A contagem das parcelas de rede usa hosts distintos com HTTP 200–399, sem erro ou bloqueio. A reconciliação agrupa hosts por domínio registrável, preservando cada host no JSON. Organização e domínio não são equivalentes.');
paragraph('Cookies: separar tentativas HTTP, tentativas JavaScript, inventário presente e identidades novas desde baseline. Set-Cookie não prova aceitação; o snapshot inicial assíncrono pode incluir cookies precoces. Atualização/expiração gera tentativa, não um novo cookie. Identidades incluem nome, domínio, path, store e partição.');
paragraph('Storage observado não prova isolamento; retorno normal de IndexedDB não comprova conclusão assíncrona. Não há bloqueio de storage, canvas ou remoção de parâmetros. Canvas legítimo também reduz a nota. Cookie sync compara valores opacos iguais sem provar intenção. Bounce pode ser login/pagamento. Hooks, polling e WebSocket não provam sequestro.');
paragraph('Workers não recebem instrumentação de APIs; seu tráfego de rede pode ser bloqueado. Eventos sem tabId não são atribuídos arbitrariamente a uma aba. Catálogo pequeno, CNAME, transformações de identificadores, alterações anteriores à baseline e contextos não injetáveis limitam a cobertura. A lista de bloqueio é independente do catálogo. Detalhes: docs/METODOLOGIA.md.');
doc.addPage();section('3. Matriz dos testes DuckDuckGo');
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
 doc.addPage();section(`3.${data.tests.indexOf(t)+1}. ${t.name}`);paragraph(t.url,8);
 paragraph(`Procedimento: ${t.procedure}`);paragraph(`Esperado informado pela página: ${t.expected}`);paragraph(`Observado: ${t.observed}`);paragraph(`Explicação e evidências: ${t.explanation}`);
 paragraph(`Coleta UTC: ${t.execution.startedAt} a ${t.execution.completedAt}. Evidências: evidencias/ddg/${t.id}/ — monitor.json, rede.har, pagina.txt/png, pagina-resultados.json e execucao.json.`,8);
 await picture(t.screenshot,'Monitor durante o teste. Resultado completo da página em '+t.pageScreenshot,Math.min(305,Math.max(180,bottom-doc.y-37)));
 if(t.mechanisms){doc.addPage();heading('Tracker Blocking: controle por mecanismo');table(['Mecanismo','Sem regra','Com regra'],t.mechanisms.map(r=>[r.id,r.before,r.after]),[303,100,100]);paragraph('WebSocket já falhou no controle; apenas o cancelamento da tentativa é atribuível à lista. Nos outros 22 mecanismos, o estado mudou de loaded para not loaded/failed.');}
}
doc.addPage();section('3.9. Controle positivo: hook e polling');
const fixture=JSON.parse(await readFile('evidencias/locais/fixture-monitor.json','utf8'));
const hook=fixture.events.find(e=>e.kind==='hook'),poll=fixture.signals.find(e=>e.kind==='polling'),sync=fixture.signals.find(e=>e.kind==='cookie-sync');
paragraph('Teste local controlado e sintético, separado das páginas DDG. A fixture altera fetch após a instrumentação e consulta um endpoint em 127.0.0.1 a partir de localhost. Isso demonstra a detecção de uma alteração posterior, enquanto o js-leaks evidencia a instrumentação do próprio monitor.');
table(['Sinal','Resultado registrado','Referência em fixture-monitor.json'],[
 ['Hook',`${hook.api}: ${hook.outcome}`,`events[${fixture.events.indexOf(hook)}]; origem ${hook.frameOrigin}`],
 ['Polling',`${poll.count} pedidos em ${(poll.spanMs/1000).toFixed(3)} s`, `signals[${fixture.signals.indexOf(poll)}]; ${poll.url}`],
 ['Correlação',`${sync.from} > ${sync.to}; parâmetro ${sync.parameter}`,`signals[${fixture.signals.indexOf(sync)}]; origem ${sync.source}`]
],[95,190,218]);
paragraph('Os indicadores detectam o comportamento, não a intenção de um invasor. O print abaixo mostra o painel da mesma execução; os detalhes de hook e polling são comprovados pelos eventos JSON da tabela. Não se trata de execução do BeEF. Evidências: evidencias/locais/fixture-monitor.json, fixture-monitor.png e execucao.json; reprodução: npm run test:browser.');
await picture('evidencias/locais/fixture-monitor.png','Painel da fixture controlada; score '+fixture.score.value+'/100.',345);
doc.addPage();section('4. Análise dos três sites');
paragraph(`Condições M, U e B separadas. Comparar cada domínio na união de pedidos, logger e cartões. Rótulos publicitários, presença de cookies e mera conexão são medidas diferentes. A reconciliação inclui ${data.sites.reduce((n,s)=>n+s.reconciliation.length,0)} grupos de domínios registráveis, inclusive recursos não classificados como rastreadores. Downloads de listas feitos pelo próprio uBlock (contexto moz-extension-scheme no logger) foram excluídos da análise da página. Aliases DNS permanecem, com o URL original indicado no campo aliasURL.`);
paragraph('Índices log.entries[N] referem-se ao HAR indicado, com base zero. Linhas do logger começam em 1. Categorias Blacklight: ddg_join_ads = rastreadores publicitários; cookies = cookies terceiros; session_recorders = bibliotecas de gravação de sessão. Ausência no logger não significa decisão explícita de permitir. reconciliacao.json preserva hosts, pedidos e regras completos.');
paragraph('Os totais monitor/HAR não são equivalentes: o HAR foi exportado antes de abrir/capturar o painel do monitor, permitindo recursos tardios entre as capturas. HAR com persistência também pode incluir navegações anteriores ao estado final do monitor. A análise confronta recursos concretos, não subtrai apenas os totais.');
heading('Comparação por categoria');
const reports=await Promise.all(data.sites.map(s=>readFile(s.pluginJson,'utf8').then(JSON.parse)));
const bls=await Promise.all(data.sites.map(s=>readFile(s.blacklightEvidence,'utf8').then(JSON.parse)));
const card=(i,type)=>bls[i].cards.find(c=>c.type===type);
table(['Categoria','BBC: monitor / BL','Magalu: monitor / BL','Wikipédia: monitor / BL'],[
 ['Hosts do catálogo / domínios publicitários',...reports.map((r,i)=>`${new Set(r.requests.filter(q=>q.thirdParty&&q.tracker).map(q=>q.domain)).size} hosts / ${card(i,'ddg_join_ads').count} domínios`)],
 ['Cookies terceiros',...reports.map((r,i)=>`${r.cookies.filter(c=>c.thirdParty).length} / ${card(i,'cookies').count}`)],
 ['Leituras canvas / fingerprint classificado',...reports.map((r,i)=>`${r.events.filter(e=>e.kind==='canvas').length} leituras / ${card(i,'canvas_fingerprinters').found?'sim':'não detectado'}`)],
 ['Eventos de correlação de ID',...reports.map(r=>`${r.signals.filter(e=>e.kind==='cookie-sync').length} / sem medida equivalente`)],
 ['Mudanças de referência',...reports.map(r=>`${r.events.filter(e=>e.kind==='hook').length} / sem medida equivalente`)],
 ['Endpoints com polling',...reports.map(r=>`${r.signals.filter(e=>e.kind==='polling').length} / sem medida equivalente`)],
 ['Gravação de sessão',...reports.map((r,i)=>`sem detector específico / ${card(i,'session_recorders').found?'Hotjar':'não detectada'}`)]
],[137,122,122,122],8.1);
paragraph('Métricas de escopo diferente são nomeadas na tabela: uma leitura de canvas não equivale a fingerprint confirmado, e um host rotulado não equivale a um domínio registrável. Eventos de correlação podem repetir o mesmo identificador. No Magalu, a condição Blacklight corresponde à página de erro. Não há uma nota oficial Blacklight equivalente ao nosso score.');
heading('Parcelas do score aplicadas aos três sites');
table(['Penalidade','BBC','Magalu','Wikipédia'],data.sites[0].penalties.map((r,i)=>[r.label,...data.sites.map(s=>s.penalties[i].penalty)]).concat([['Score final',...data.sites.map(s=>s.score)]]),[293,70,70,70]);
for(const s of data.sites){
 doc.addPage();section(`4.${data.sites.indexOf(s)+1}. ${s.name}`);paragraph(s.url);paragraph(`Score: ${s.score}/100. ${s.scoreDiscussion}`);
 table(['Métrica','Resultado'],[
  ['Pedidos monitor / entradas HAR',`${s.summary.requests} / ${s.summary.harEntries}`],['Hosts terceiros contatados',s.summary.thirdPartyHosts],['Cookies presentes / terceiros',`${s.summary.cookies} / ${s.summary.thirdPartyCookies}`],['Blacklight: rastreadores / cookies terceiros',`${s.summary.blacklightTrackers} / ${s.summary.blacklightCookies}`],['uBlock: linhas --/<< / hosts distintos',`${s.summary.ublockBlockedLogRows} / ${s.summary.ublockBlockedHosts}`]
 ],[300,203]);
 room(150);heading('Cookies: inventário e operações HTTP');
 table(['Parte','Duração','Presentes','Tentativas Set-Cookie'],s.cookieBreakdown.map(r=>[r.party,r.duration,r.present,r.httpAttempts]),[140,120,93,150]);
 paragraph('Tentativas incluem atualizações e exclusões; não são cookies únicos nem comprovadamente aceitos. Chamadas JavaScript estão separadas em events[kind=cookie-write]. Presença e partição estão em monitor.json/cookies.');
 paragraph(`M: ${s.conditions.monitor.startedAt} a ${s.conditions.monitor.completedAt}; U: ${s.conditions.ublock.startedAt} a ${s.conditions.ublock.completedAt}; B: ${s.conditions.blacklight.startedAt} a ${s.conditions.blacklight.endedAt}. Horários UTC.`,8);
 paragraph(`Fontes: ${s.har}; ${s.pluginJson}; ${s.blacklightEvidence}; ${s.ublockEvidence}. Demais arquivos de comparação na mesma pasta.`,8);
 doc.addPage();heading(`${s.name}: Firefox com monitor`);await picture(s.screenshot,'Painel do monitor e URL observada.');await picture(s.pageScreenshot,'Página carregada na condição M.',290);
 doc.addPage();heading(`${s.name}: ferramentas de referência`);await picture(s.blacklightScreenshot,'Interface oficial Blacklight. Dados completos em blacklight-resultados.json.');await picture(s.ublockScreenshot,'Logger real do uBlock na condição U; regras e ações em ublock-logger.txt.',290);
 if(s.id==='site-2'){doc.addPage();heading('Magazine Luiza: página recebida pelo Blacklight');await picture(s.blacklightPage,'Imagem oficial do arquivo Blacklight: a loja retornou erro. Não corresponde à página normal vista pelo Firefox.',310);paragraph('O histórico registra também navegação ao atendimento, com recursos no HAR Blacklight. Isso limita a comparação, mesmo com status success na API da ferramenta.');}
}
doc.addPage();section('5. Reconciliação por domínio');
paragraph('A tabela preserva todos os 118 grupos de domínios das três análises. Para reduzir repetição, M indica monitor, B indica Blacklight e U indica uBlock. Os números de pedidos e registros não representam rastreadores distintos. Categorias B: anúncios, cookies e sessão (session replay).');
paragraph('Referências por site: M[N] = monitor.har/log.entries[N]; B[N] = blacklight.har/log.entries[N]; U linha N = ublock-logger.txt. Índices HAR começam em zero e linhas em um. Cartões B referem-se a blacklight-resultados.json/cards. URLs completas, hosts, iniciadores e todas as ocorrências estão em reconciliacao.json e analise.md da mesma pasta.');
paragraph('Recursos vistos em apenas uma execução demonstram diferença de tráfego, mas sua causa pode permanecer indeterminada. Essa limitação está marcada, sem atribuir automaticamente a cache, região ou bloqueio em cadeia. Downloads feitos pela própria extensão uBlock estão excluídos; aliases DNS são apontados separadamente.');
const categories={ddg_join_ads:'anúncios',cookies:'cookies',session_recorders:'sessão'};
for(const s of data.sites){
 if(s!==data.sites[0])doc.addPage();section(`5.${data.sites.indexOf(s)+1}. ${s.name}`);
 paragraph(`Arquivos: evidencias/sites/${s.id}/. A descrição extensa de cada linha permanece em analise.md.`,8);
 const details=JSON.parse(await readFile(`evidencias/sites/${s.id}/reconciliacao.json`,'utf8'));
 const rows=details.rows.map(row=>{
  const r=row.observations,blocked=r.ublock.filter(e=>['--','<<'].includes(e.action)),known=[...new Set(r.monitor.map(q=>q.tracker).filter(Boolean))];
  const cats=[...new Set(r.blacklight.map(c=>categories[c.category]||c.category))],explain=[];
  if(r.monitor.length&&!known.length&&cats.includes('anúncios'))explain.push('M capturou a conexão; o catálogo local não tem o rótulo publicitário de B.');
  if(r.blacklightHar.length&&!cats.length)explain.push('B contém tráfego, mas não classifica o domínio nos cartões.');
  if(cats.length&&!r.blacklightHar.length)explain.push('B classifica no cartão; seu próprio HAR não contém o pedido correspondente.');
  const alias=r.ublock.find(e=>e.aliasURL);
  if(alias)explain.push(`Alias DNS no U (linha ${alias.line}), original ${alias.aliasURL.split('?')[0]}; M não resolve CNAME.`);
  if(blocked.length)explain.push(`U linha ${blocked[0].line}: regra ${blocked[0].rule}.`);
  else if(r.ublock.length)explain.push('U registrou sem ação de bloqueio/redirecionamento.');
  else explain.push('U sem registro nesta amostra; não prova permissão nem causa da ausência.');
  if(!r.blacklightHar.length&&!cats.length)explain.push(s.id==='site-2'?'B recebeu página de erro e atendimento, não a loja normal.':'Sem pedido em B; causa individual não isolada.');
  if(!r.monitor.length&&r.blacklightHar.length)explain.push('Pedido exclusivo de B; ausente também no HAR local, causa não isolada.');
  const refs=[];
  for(const [key,label] of [['har','M'],['blacklightHar','B']])if(r[key].length){const e=r[key][0];let path='';try{path=new URL(e.url).pathname;}catch{}if(path.length>85)path=path.slice(0,82)+'...';refs.push(`${label}[${e.entry}] HTTP ${e.status}: ${path}`);}
  if(r.ublock.length)refs.push(`U linha ${(blocked[0]||r.ublock[0]).line}`);
  if(cats.length)refs.push('Cartões B: '+cats.join(', '));
  if(!refs.length&&r.ublockHar.length)refs.push(`ublock.har[${r.ublockHar[0].entry}]`);
  return [`${row.domain}\nM: ${r.monitor.length} pedidos; ${known.join(', ')||'sem rótulo'}.\nB: ${r.blacklightHar.length} pedidos; ${cats.join(', ')||'sem categoria'}.\nU: ${r.ublock.length} registros; ${blocked.length} bloqueio/redirect.`,explain.join(' ')+'\nEvidência: '+refs.join('; ')+'.'];
 });
 table(['Domínio e observações','Explicação e referência concreta'],rows,[181,322],8.1);
}
doc.addPage();section('6. Conclusões e reprodutibilidade');
paragraph('As coletas demonstram conexões externas, distinção de cookies, chamadas de armazenamento e canvas, bounce e bloqueio personalizado. O monitor não implementa todas as proteções avaliadas pelo DDG. O js-leaks evidencia a própria instrumentação; indicadores de hook não são diagnóstico de comprometimento.');
paragraph('O score concorda com a alta exposição publicitária da BBC, mas penaliza infraestrutura legítima na Wikipédia. A coleta Blacklight da Magazine Luiza é limitada pela página de erro. Para domínios presentes em apenas uma amostra, os registros comprovam a diferença; quando não permitem isolar a causa, a incerteza é declarada no item correspondente. Não foi inventada uma explicação causal para satisfazer a comparação.');
paragraph('Reprodução: npm ci; npm run check; npm run test:browser. Coletas: scripts/collect-ddg.mjs, collect-sites.mjs, collect-ublock.mjs e collect-blacklight.mjs. Resultados variam com tempo e ambiente. Consolidação: scripts/prepare-report-data.mjs; npm run report -- --final. Roteiro em docs/VALIDACAO.md e checklist em docs/ENTREGA.md.');
paragraph('Commits incrementais reais devem permanecer no Git. Este PDF não certifica a distribuição do trabalho ao longo da semana nem a atribuição de conceito pelo professor.');
heading('Referências e materiais');
for(const url of ['https://github.com/Fgb4z/firefox-privacy-monitor','https://github.com/duckduckgo/privacy-test-pages','https://www.first-party.site/','https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions','https://themarkup.org/blacklight','https://github.com/gorhill/uBlock','https://publicsuffix.org/list/'])paragraph(url,9);
paragraph('Enunciado: Avaliacao_Intermediaria_Ciberseguranca.pdf, João Eduardo Luisi, Insper. Seleção livre dos sites e prazo de 29/09 informados pelo aluno.');
if(pending.length){heading(`Pendências (${pending.length})`);pending.forEach(p=>paragraph(p));}
doc.switchToPage(tocPage);doc.y=46;heading('Sumário');
table(['Seção','Página'],toc.map(item=>[item.text,item.page]),[450,53],9);
paragraph('Versão compacta: mesmos dados e scores, com texto e print de cada teste juntos. Todos os domínios continuam no apêndice deste PDF; descrições extensas e registros completos permanecem nos arquivos do repositório.');
const range=doc.bufferedPageRange();for(let i=0;i<range.count;i++){doc.switchToPage(i);doc.font('Helvetica').fontSize(8).fillColor('#60747c').text(`${final?'FINAL':'RASCUNHO'} | Fernando Guerra Boni | Privacy Monitor | ${i+1}/${range.count}`,46,803,{lineBreak:false});}
doc.end();await finished(stream);console.log(`${resolve(output)}\n${range.count} páginas; ${pending.length} pendências de preenchimento.`);
