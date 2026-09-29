import { By } from 'selenium-webdriver';
import { readFile,mkdir,writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { launch,sites,pause,openExtension,ublockUUID,openNetwork,exportHar } from './browser-session.mjs';
import { sanitizeHar } from './sanitize-har.mjs';
import { safeUrl,host } from '../src/core.js';
const provenance=JSON.parse(await readFile('.cache/ublock/origin.json','utf8'));
for(const site of (process.argv[2]?sites.filter(s=>s.id===process.argv[2]):sites)) {
  const out=`evidencias/sites/${site.id}`;await mkdir(out,{recursive:true});
  const driver=await launch();const metadata={site:site.url,startedAt:new Date().toISOString(),condition:'U: uBlock Origin sozinho em perfil novo; sem Privacy Monitor',ublock:provenance,consent:'Sem interação com cookies, sem login',observationSeconds:30};
  try {
    await driver.installAddon(resolve('.cache/ublock/ublock.xpi'),true);
    const pageHandle=await driver.getWindowHandle();
    await driver.switchTo().newWindow('tab');
    await openExtension(driver,`moz-extension://${ublockUUID}/logger-ui.html`);
    const loggerHandle=await driver.getWindowHandle();
    await driver.wait(async()=>(await driver.findElements(By.id('pageSelector'))).length>0,15000);
    await pause(15000);
    metadata.settings=await driver.executeAsyncScript('const done=arguments[arguments.length-1]; browser.storage.local.get(["selectedFilterLists","userSettings","version"]).then(done);');
    await driver.switchTo().window(pageHandle);await openNetwork(driver);
    console.log(`${site.id}: uBlock navegando`);await driver.get(site.url);await pause(30000);
    metadata.finalUrl=await driver.getCurrentUrl();metadata.title=await driver.getTitle();
    await writeFile(`${out}/ublock-pagina.png`,await driver.takeScreenshot(),'base64');
    const har=await exportHar(driver);
    if(har?.log?.entries) {await writeFile(`.cache/evidence-originals/${site.id}-ublock.har`,JSON.stringify(har,null,2));await writeFile(`${out}/ublock.har`,JSON.stringify(sanitizeHar(har),null,2));metadata.harEntries=har.log.entries.length;}
    await driver.switchTo().window(loggerHandle);
    await driver.executeScript('const s=document.querySelector("#pageSelector");s.value="0";s.dispatchEvent(new Event("change",{bubbles:true}));');await pause(1500);
    await writeFile(`${out}/ublock-logger.png`,await driver.takeScreenshot(),'base64');
    await driver.findElement(By.id('loggerExport')).click();
    await driver.findElement(By.css('#modalOverlay [data-radio="format"] [data-radio-item="table"]')).click();
    await driver.findElement(By.css('#modalOverlay [data-radio="encoding"] [data-radio-item="plain"]')).click();
    const raw=await driver.findElement(By.css('#modalOverlay textarea.output')).getAttribute('value');
    await writeFile(`.cache/evidence-originals/${site.id}-ublock-logger.txt`,raw);
    const clean=raw.split('\n').map(line=>line.split('\t').map(cell=>/^https?:\/\//.test(cell)?safeUrl(cell):cell).join('\t')).join('\n');
    await writeFile(`${out}/ublock-logger.txt`,clean);
    const rows=clean.split('\n').map((line,i)=>({line:i+1,fields:line.split('\t')}));
    const blocked=rows.filter(r=>['--','<<'].includes(r.fields[2]) && /^https?:\/\//.test(r.fields[7]||''));
    const domains=[...new Set(blocked.map(r=>host(r.fields[7])))].map(domain=>({domain,evidence:`ublock-logger.txt linhas ${blocked.filter(r=>host(r.fields[7])===domain).map(r=>r.line).join(', ')}`,rules:[...new Set(blocked.filter(r=>host(r.fields[7])===domain).map(r=>r.fields[1]))]}));
    await writeFile(`${out}/ublock-dominios.json`,JSON.stringify(domains,null,2));
    metadata.logLines=rows.length;metadata.blockedRequests=blocked.length;metadata.blockedDomains=domains.length;metadata.completedAt=new Date().toISOString();
    await writeFile(`${out}/ublock-ambiente.json`,JSON.stringify(metadata,null,2));
    console.log(`${site.id}: logger ${rows.length} linhas, ${blocked.length} bloqueios, ${domains.length} domínios`);
  }catch(error){metadata.error=String(error);await writeFile(`${out}/ublock-erro.json`,JSON.stringify(metadata,null,2));console.error(`${site.id}: ${error}`);}
  finally{await driver.quit();}
}
