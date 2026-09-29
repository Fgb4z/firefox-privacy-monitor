import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { launch, sites, pause, chrome, openNetwork, exportHar, saveMonitor } from './browser-session.mjs';
import { sanitizeHar, digest } from './sanitize-har.mjs';
const selected = process.argv[2] ? sites.filter(s=>s.id===process.argv[2]) : sites;
for (const site of selected) {
  const out = `evidencias/sites/${site.id}`;
  await mkdir(out,{recursive:true}); await mkdir('.cache/evidence-originals',{recursive:true});
  const driver=await launch();
  const metadata={ site:site.name,requestedUrl:site.url,startedAt:new Date().toISOString(),condition:'M: somente Privacy Monitor; perfil Firefox novo por site',consent:'Sem interação com avisos de cookies; nenhum login, formulário ou compra.',observationSeconds:30,headless:true,viewport:{width:1440,height:1100},harSource:'Firefox DevTools NetMonitorAPI.getHar → HarExporter',warnings:[] };
  try {
    await driver.installAddon(resolve('extension'),true);
    const pageHandle=await driver.getWindowHandle();
    await openNetwork(driver);
    metadata.preferences=await chrome(driver,`return {etp:Services.prefs.getStringPref('browser.contentblocking.category','standard'),trackingProtection:Services.prefs.getBoolPref('privacy.trackingprotection.enabled',false),cookieBehavior:Services.prefs.getIntPref('network.cookie.cookieBehavior',0),acceptLanguage:Services.prefs.getStringPref('intl.accept_languages',''),timezone:Intl.DateTimeFormat().resolvedOptions().timeZone};`);
    console.log(`${site.id}: navegando ${site.url}`);
    try { await driver.get(site.url); } catch(error) { metadata.warnings.push(String(error).slice(0,500)); }
    await pause(30000);
    metadata.finalUrl=await driver.getCurrentUrl(); metadata.title=await driver.getTitle();
    const visible=await driver.executeScript('return document.body?.innerText || ""');
    await writeFile(`${out}/pagina.txt`,visible);
    await writeFile(`${out}/pagina.png`,await driver.takeScreenshot(),'base64');
    const har=await exportHar(driver);
    if(!har?.log?.entries?.length) throw new Error('DevTools retornou HAR vazio.');
    const raw=JSON.stringify(har,null,2);
    await writeFile(`.cache/evidence-originals/${site.id}-monitor.har`,raw);
    await writeFile(`${out}/monitor.har`,JSON.stringify(sanitizeHar(har),null,2));
    metadata.rawHarDigest=digest(raw); metadata.harEntries=har.log.entries.length;
    const report=await saveMonitor(driver,pageHandle,out,writeFile);
    metadata.score=report.score.value; metadata.requests=report.requests.length;
    metadata.browserVersion=(await driver.getCapabilities()).get('browserVersion');metadata.completedAt=new Date().toISOString();
    await writeFile(`${out}/ambiente.json`,JSON.stringify(metadata,null,2));
    console.log(`${site.id}: HAR ${metadata.harEntries} entradas; monitor ${metadata.requests} pedidos; score ${metadata.score}; ${metadata.title}`);
  } catch(error) { metadata.error=String(error);await writeFile(`${out}/erro-coleta.json`,JSON.stringify(metadata,null,2));console.error(`${site.id}: ${error}`); }
  finally {await driver.quit();}
}
