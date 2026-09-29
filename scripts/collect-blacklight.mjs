import { By } from 'selenium-webdriver';
import { mkdir,writeFile,copyFile } from 'node:fs/promises';
import { launch,sites,pause } from './browser-session.mjs';
for(const site of (process.argv[2]?sites.filter(s=>s.id===process.argv[2]):sites)) {
  const out=`evidencias/sites/${site.id}`;await mkdir(out,{recursive:true});
  const driver=await launch();const meta={site:site.url,startedAt:new Date().toISOString(),source:'https://themarkup.org/blacklight',action:'Submissão do formulário oficial',warnings:[]};
  try {
    for(const file of ['blacklight.txt','blacklight.png','blacklight-detalhes.png','blacklight-ambiente.json'])try{await copyFile(`${out}/${file}`,`${out}/${file.replace('blacklight','blacklight-inicial')}`);}catch{}
    await driver.get('https://themarkup.org/blacklight');
    await driver.wait(async()=> (await driver.findElements(By.css('input[name="url"]'))).length>0,20000);
    await driver.findElement(By.css('input[name="url"]')).sendKeys(site.url);
    await driver.executeScript(function(force) {
      document.querySelector('input[name=device][value=desktop]').click();
      document.querySelector('input[name=force][value="' + force + '"]').click();
      document.querySelector('input[name=location][value=us-oh]').click();
    },process.argv.includes('--cached')?'false':'true');
    meta.options=await driver.executeScript('return [...document.querySelectorAll("input[type=radio]:checked")].map(e=>({name:e.name,value:e.value}))');
    await driver.findElement(By.xpath('//button[contains(.,"Scan Site")]')).click();
    console.log(`${site.id}: Blacklight solicitado`);
    await pause(45000);
    let text=await driver.findElement(By.css('body')).getText();
    for(let i=0;i<3 && !/Blacklight Inspection Result|There is an issue|could not|unable to/i.test(text);i++){await pause(30000);text=await driver.findElement(By.css('body')).getText();}
    await driver.executeScript('for(const b of document.querySelectorAll(".js-blacklight-client-toggle,.blacklight-client__more"))b.click()');
    text=await driver.findElement(By.css('body')).getText();
    meta.finalUrl=await driver.getCurrentUrl();meta.completedAt=new Date().toISOString();
    meta.links=await driver.executeScript('return [...document.querySelectorAll("a")].map(a=>({text:a.innerText,href:a.href})).filter(a=>a.text)');
    await writeFile(`${out}/blacklight.txt`,text);
    await driver.executeScript('document.querySelector("input[name=url]")?.scrollIntoView({block:"center"})');
    await writeFile(`${out}/blacklight.png`,await driver.takeScreenshot(),'base64');
    await driver.executeScript('window.scrollBy(0,650)');
    await writeFile(`${out}/blacklight-detalhes.png`,await driver.takeScreenshot(),'base64');
    await writeFile(`${out}/blacklight-ambiente.json`,JSON.stringify(meta,null,2));
    console.log(`${site.id}: Blacklight capturado (${text.length} caracteres)`);
  } catch(error) {meta.error=String(error);await writeFile(`${out}/blacklight-erro.json`,JSON.stringify(meta,null,2));console.error(meta.error);}
  finally {await driver.quit();}
}
