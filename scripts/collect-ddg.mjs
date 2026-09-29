import { By } from 'selenium-webdriver';
import { mkdir,readFile,writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { launch,pause,openNetwork,exportHar,saveMonitor,openExtension,monitorUUID,extensionCall } from './browser-session.mjs';
import { sanitizeHar } from './sanitize-har.mjs';
const data=JSON.parse(await readFile('docs/relatorio/dados.json','utf8'));
const selected=process.argv[2]?data.tests.filter(t=>t.id===process.argv[2]):data.tests;
for(const test of selected){
  const out=`evidencias/ddg/${test.id}`;await mkdir(out,{recursive:true});
  const driver=await launch();const meta={url:test.url,startedAt:new Date().toISOString(),steps:[],condition:'Firefox headless, perfil novo, somente Privacy Monitor; configuração de privacidade padrão do perfil Selenium'};
  const click=async id=>{await driver.findElement(By.id(id)).click();meta.steps.push(`Clique #${id}`);};
  const capture=async(dir,handle)=>{
    await mkdir(dir,{recursive:true});
    await driver.executeScript('for(const d of document.querySelectorAll("details"))d.open=true;');
    await writeFile(dir+'/pagina.txt',await driver.findElement(By.css('body')).getText());
    await writeFile(dir+'/pagina.png',await driver.takeScreenshot(),'base64');
    await writeFile(dir+'/pagina-resultados.json',JSON.stringify(await driver.executeScript('return [...document.querySelectorAll("table,tr,pre,details,li,.result,.test-result,[data-result]")].map(e=>({tag:e.tagName,id:e.id,classes:e.className,text:e.innerText,html:e.outerHTML})).filter(e=>e.text)'),null,2));
    const har=await exportHar(driver);if(har?.log?.entries?.length)await writeFile(dir+'/rede.har',JSON.stringify(sanitizeHar(har),null,2));
    const report=await saveMonitor(driver,handle,dir,writeFile);return report;
  };
  try{
    await driver.installAddon(resolve('extension'),true);const handle=await driver.getWindowHandle();await openNetwork(driver);await driver.get(test.url);await pause(2000);
    await writeFile(out+'/instrucoes-pagina.txt',await driver.findElement(By.css('body')).getText());
    console.log(`${test.id}: executando`);
    if(test.id==='storage-blocking'){await click('store');await pause(6000);await click('retrive');await pause(6000);}
    if(test.id==='fingerprinting'){await click('start');await pause(15000);}
    if(test.id==='storage-partitioning'){await click('run');await pause(30000);if((await driver.findElement(By.id('toggle-details')).isDisplayed()))await click('toggle-details');await pause(1000);}
    if(test.id==='js-leaks'){
      meta.profiles=await driver.executeScript('return [...document.querySelectorAll("select option")].map(e=>({value:e.value,text:e.textContent}))');
      await driver.executeScript('const s=document.querySelector("select");const o=[...s.options].find(o=>/firefox/i.test(o.value+o.textContent));if(o){s.value=o.value;s.dispatchEvent(new Event("change",{bubbles:true}));}');
      meta.selectedProfile=await driver.executeScript('return document.querySelector("select")?.value');await click('run');await pause(10000);
    }
    if(test.id==='bounce-tracking'){await driver.findElement(By.linkText('Go to first-party.site')).click();meta.steps.push('Link Go to first-party.site: A → bad.third-party.site → A');await pause(12000);}
    if(test.id==='query-parameters'){
      await driver.findElement(By.linkText('Link with utm_source and 1 standard parameter')).click();meta.steps.push('Link utm_source + q');await pause(3000);
    }
    if(test.id==='tracker-blocking'){
      await click('start');await pause(20000);await capture(out+'/sem-bloqueio',handle);
      await driver.switchTo().newWindow('tab');await openExtension(driver,`moz-extension://${monitorUUID}/ui/report.html`);await extensionCall(driver,{type:'save-rules',rules:['bad.third-party.site']});await driver.close();await driver.switchTo().window(handle);
      await driver.get(test.url);await pause(2000);await click('start');meta.steps.push('Segunda execução após bloquear bad.third-party.site');await pause(20000);
    }
    const report=await capture(out,handle);
    meta.finalUrl=await driver.getCurrentUrl();meta.completedAt=new Date().toISOString();meta.requests=report.requests.length;meta.events=report.events.length;meta.truncated=report.truncated;
    await writeFile(out+'/execucao.json',JSON.stringify(meta,null,2));console.log(`${test.id}: ${report.requests.length} pedidos / ${report.events.length} eventos`);
  }catch(error){meta.error=String(error);await writeFile(out+'/erro.json',JSON.stringify(meta,null,2));console.error(`${test.id}: ${error}`);}
  finally{await driver.quit();}
}
