import { sites,pause } from './browser-session.mjs';
import { mkdir,writeFile } from 'node:fs/promises';
await mkdir('.cache/blacklight',{recursive:true});
for(const site of sites){
  try{
    const response=await fetch('https://blacklight-us-oh.api.themarkup.org/graphic-api',{method:'POST',body:JSON.stringify({inUrl:site.url,device:'desktop',force:false,location:'us-oh'}),signal:AbortSignal.timeout(45000)});
    const raw=await response.text();await writeFile(`.cache/blacklight/${site.id}-api.json`,raw);
    const json=JSON.parse(raw);console.log(site.id,response.status,JSON.stringify({keys:Object.keys(json),status:json.status,error:json.nicer_error_message,summary:json.summary}).slice(0,2000));
  }catch(error){console.log(site.id,String(error));}
  await pause(1000);
}
