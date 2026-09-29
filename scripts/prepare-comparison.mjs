import { readFile,writeFile } from 'node:fs/promises';
import { sanitizeHar } from './sanitize-har.mjs';
import { sites } from './browser-session.mjs';
import { site as registrable,host,safeUrl } from '../src/core.js';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
const resource=value=>{try{const u=new URL(value);return u.origin+u.pathname+(u.search?' (query preservada no HAR)':'');}catch{return value;}};
for(const s of sites){
 const out=`evidencias/sites/${s.id}`;
 const original=await json(`.cache/blacklight/${s.id}-requests.har`);const blackHar=sanitizeHar(original);blackHar.log.comment=blackHar.log.comment.replace('Exportado pelo Firefox DevTools NetMonitorAPI.getHar/HarExporter.','HAR extraído do arquivo oficial Blacklight, campo archive em blacklight-resultados.json.');
 await writeFile(out+'/blacklight.har',JSON.stringify(blackHar,null,2));
 const monitor=await json(out+'/monitor.json'),har=await json(out+'/monitor.har'),uHar=await json(out+'/ublock.har'),bl=await json(out+'/blacklight-resultados.json');
 const logger=(await readFile(out+'/ublock-logger.txt','utf8')).split('\n').map((text,i)=>({line:i+1,fields:text.split('\t')}));
 const maps=new Map();const get=d=>{const key=registrable(d);if(!key)return null;if(!maps.has(key))maps.set(key,{domain:key,hosts:new Set(),monitor:[],har:[],ublock:[],ublockHar:[],blacklight:[],blacklightHar:[]});return maps.get(key);};
 const addHar=(doc,key)=>doc.log.entries.forEach((e,i)=>{const h=host(e.request.url),r=get(h);if(!r)return;r.hosts.add(h);r[key].push({entry:i,url:safeUrl(e.request.url),status:e.response.status,startedAt:e.startedDateTime,type:e._resourceType,initiator:e._initiator,initiatorDetail:e._initiator_detail,initiatorType:e._initiator_type});});
 addHar(har,'har');addHar(uHar,'ublockHar');addHar(blackHar,'blacklightHar');
 for(const req of monitor.requests){const r=get(req.domain);if(r){r.hosts.add(req.domain);r.monitor.push(req);}}
 for(const row of logger){const h=host(row.fields[7]);if(!h||row.fields[3]?.endsWith('.moz-extension-scheme'))continue;const r=get(h);r.hosts.add(h);r.ublock.push({line:row.line,rule:row.fields[1],action:row.fields[2],method:row.fields[5],type:row.fields[6],url:row.fields[7],context:row.fields[3],aliasURL:row.fields.find(f=>f.startsWith('aliasURL='))?.slice(9)});}
 for(const c of bl.cards)for(const domain of c.domains){const r=get(domain);if(r)r.blacklight.push({domain,category:c.type});}
 const rows=[...maps.values()].sort((a,b)=>a.domain.localeCompare(b.domain)).map(r=>{
  const blocked=r.ublock.filter(e=>['--','<<'].includes(e.action)),known=[...new Set(r.monitor.map(x=>x.tracker).filter(Boolean))];
  const refs=[];for(const [key,file] of [['har','monitor.har'],['blacklightHar','blacklight.har'],['ublockHar','ublock.har']])if(r[key].length)refs.push(`${file}: log.entries[${r[key].slice(0,4).map(e=>e.entry).join('], [')}]`);
  if(r.ublock.length)refs.push(`ublock-logger.txt: linhas ${(blocked.length?blocked:r.ublock).slice(0,5).map(e=>e.line).join(', ')}`);
  if(r.blacklight.length)refs.push('blacklight-resultados.json: cards '+[...new Set(r.blacklight.map(e=>e.category))].join(', '));
  const details=[];
  if(r.har.length){const first=r.har[0];details.push(`Firefox registrou ${r.har.length} entradas deste domínio, por exemplo ${first.url} (HTTP ${first.status}, entrada ${first.entry}).`);}else details.push('Este domínio não consta no HAR da execução M; isso limita a afirmação a esta amostra.');
  if(r.monitor.length&&!known.length&&r.blacklight.some(e=>e.category==='ddg_join_ads'))details.push(`O monitor observou a conexão, mas não a rotulou como rastreador: ${r.domain} não está no catálogo demonstrativo de src/core.js. Blacklight a classifica por Tracker Radar; trata-se de diferença de classificação, não ausência de captura.`);
  else if(known.length)details.push(`O catálogo do monitor identifica ${known.join(', ')} nos hosts ${[...new Set(r.monitor.filter(q=>q.tracker).map(q=>q.domain))].join(', ')}.`);
  else if(r.monitor.length)details.push('O monitor apresenta estas conexões sem rótulo de rastreador; a detecção de rede é mais ampla que seu catálogo.');
  if(blocked.length)details.push(`uBlock produziu ${blocked.length} linhas de bloqueio/redirecionamento, com regra concreta ${blocked[0].rule}, aplicada a ${blocked[0].url} (linha ${blocked[0].line}). Linhas de redirecionamento e bloqueio do mesmo recurso não são somadas como rastreadores distintos.`);
  else if(r.ublock.length)details.push(`O logger uBlock tem ${r.ublock.length} registros deste domínio, sem ação --/<< na amostra. A presença no monitor não implica que deva ser bloqueado; ver linhas ${r.ublock.slice(0,3).map(e=>e.line).join(', ')}.`);
  else details.push('O domínio não foi registrado no logger uBlock nesta execução separada; não equivale a uma decisão explícita de permitir.');
  if(r.blacklight.length)details.push(`Blacklight associou o domínio às categorias ${[...new Set(r.blacklight.map(e=>e.category))].join(', ')}; cookies de terceiros e rastreadores publicitários são categorias distintas.`);
  else if(r.blacklightHar.length)details.push(`Blacklight também contatou este domínio (${r.blacklightHar.length} entradas no seu HAR), mas não o incluiu nos domínios dos cartões de rastreadores/cookies/session replay. É diferença entre tráfego bruto e critérios dos cartões.`);
  else if(s.id==='site-2')details.push('O HAR Blacklight pertence à navegação que recebeu a página de erro da loja e depois atendimento.magazineluiza.com.br/hc/pt-br/. Essa diferença de documento é comprovada por pageTitle e browsingHistory em blacklight-resultados.json; a ausência aqui não é comparável ao carregamento normal no Firefox.');
  else details.push('O domínio não consta no HAR Blacklight desta amostra. A diferença de tráfego está comprovada, mas a causa individual não pode ser afirmada apenas com ausência; condições e horários diferem, conforme os metadados das duas execuções.');
  if(!r.monitor.length&&r.blacklightHar.length){const e=r.blacklightHar[0];details.push(`A ocorrência exclusiva do Blacklight está concretamente registrada em blacklight.har[${e.entry}]: ${e.url}, HTTP ${e.status}. Não foi reproduzida no Firefox; não há base para atribuí-la a uma falha do catálogo, pois nem o HAR local contém o pedido.`);}
  if(!r.monitor.length&&r.blacklightHar.some(e=>typeof e.initiator==='string')){const e=r.blacklightHar.find(e=>typeof e.initiator==='string');details.push(`O iniciador registrado pelo Blacklight foi ${safeUrl(e.initiator)} (entrada ${e.entry}, campo _initiator). Isso identifica a cadeia executada nessa condição, sem presumir a mesma execução no Firefox.`);}
  if(r.blacklight.length&&!r.blacklightHar.length)details.push('O cartão Blacklight inclui este domínio, porém o HAR do próprio Blacklight não contém pedido correspondente. Há uma diferença de cobertura entre os artefatos da mesma ferramenta; o cartão comprova a classificação, mas este HAR não permite afirmar status, conclusão ou causa da ausência local.');
  if(r.ublock.some(e=>e.aliasURL)){const e=r.ublock.find(e=>e.aliasURL);details.push(`A linha ${e.line} é um alias DNS resolvido pelo uBlock: ${e.url}, com aliasURL=${e.aliasURL}. O monitor observa o URL original e não resolve CNAME; essa é uma diferença concreta de representação/cobertura, não necessariamente uma conexão adicional.`);}
  const explanation=details.join(' ').replace(/https?:\/\/[^\s)]+/g,resource);
  return {domain:r.domain,hosts:[...r.hosts],plugin:`${r.monitor.length} pedidos; catálogo: ${known.join(', ')||'sem classificação'}`,blacklight:`${r.blacklightHar.length} pedidos; categorias: ${[...new Set(r.blacklight.map(x=>x.category))].join(', ')||'nenhuma nos cartões'}`,ublock:`${r.ublock.length} registros; ${blocked.length} bloqueados/redirecionados`,explanation,evidence:refs.join('; '),observations:r};
 });
 for(const row of rows)row.observations.hosts=[...row.observations.hosts];
 await writeFile(out+'/reconciliacao.json',JSON.stringify({unit:'Domínio registrável; hosts completos preservados. União de todos os HARs, monitor, logger e cartões Blacklight.',rows},null,2));
 const readme=['# Comparação — '+s.name,'','Fontes: HARs reais das três condições, relatório do monitor, logger uBlock e resultado oficial Blacklight. Nenhuma ausência é tomada automaticamente como bloqueio ou falso negativo.',''];
 for(const row of rows)readme.push(`## ${row.domain}`,`${row.plugin} | Blacklight: ${row.blacklight} | uBlock: ${row.ublock}`,'',row.explanation,'','Evidências: '+row.evidence,'');
 await writeFile(out+'/analise.md',readme.join('\n'));
 console.log(s.id,rows.length,'domínios reconciliados');
}
