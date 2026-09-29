import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {safeUrl} from '../src/core.js';
for(const id of ['site-1','site-2','site-3']){
 const raw=JSON.parse(await readFile(`.cache/blacklight/${id}-api.json`,'utf8'));
 if(raw.status!=='success')throw new Error(`${id}: Blacklight sem sucesso.`);
 const result={source:'API pública usada pelo frontend oficial Blacklight',endpoint:'https://blacklight-us-oh.api.themarkup.org/graphic-api',retrievedAt:new Date().toISOString(),status:raw.status,inspectedUrl:raw.uri_ins,destinationUrl:raw.uri_dest,pageTitle:raw.page_title,startedAt:raw.start_time,endedAt:raw.end_time,location:raw.location,browser:raw.browser,device:raw.config.emulateDevice,browsingHistory:raw.browsing_history.map(safeUrl),hosts:raw.hosts.requests,trackerRadarUpdated:raw.tracker_radar_last_updated,cards:raw.groups[0].cards.map(c=>({type:c.cardType,found:c.testEventsFound,count:c.bigNumber,domains:c.domainData?.scripts||[]})),archive:raw.s3?.archive,reportUrl:raw.s3?.report,screenshots:raw.s3?.screenshots};
 const domains=new Map();for(const c of result.cards)for(const domain of c.domains){if(!domains.has(domain))domains.set(domain,{domain,categories:[],evidence:`blacklight-resultados.json cards[type=${c.type}].domains`});domains.get(domain).categories.push(c.type);}
 await writeFile(`evidencias/sites/${id}/blacklight-resultados.json`,JSON.stringify(result,null,2));
 await writeFile(`evidencias/sites/${id}/blacklight-dominios.json`,JSON.stringify([...domains.values()],null,2));
 if(raw.s3?.screenshots?.[0])try{const response=await fetch(raw.s3.screenshots[0]);if(response.ok)await writeFile(`evidencias/sites/${id}/blacklight-pagina-inspecionada.jpg`,Buffer.from(await response.arrayBuffer()));}catch(e){console.log(id,'screenshot:',e.message);}
 if(raw.s3?.archive)try{const response=await fetch(raw.s3.archive);if(response.ok){const body=Buffer.from(await response.arrayBuffer());await writeFile(`.cache/blacklight/${id}-archive.zip`,body);console.log(id,'arquivo Blacklight',body.length,'bytes');}}catch(e){console.log(id,'archive:',e.message);}
}
