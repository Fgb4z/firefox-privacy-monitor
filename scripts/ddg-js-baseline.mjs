import { By } from 'selenium-webdriver';
import { writeFile } from 'node:fs/promises';
import { launch,pause } from './browser-session.mjs';
const driver=await launch();
try{
 await driver.get('https://www.first-party.site/security/js-leaks.html');await pause(2000);await driver.findElement(By.id('run')).click();await pause(10000);
 await writeFile('evidencias/ddg/js-leaks/sem-monitor.txt',await driver.findElement(By.css('body')).getText());
 await writeFile('evidencias/ddg/js-leaks/sem-monitor.png',await driver.takeScreenshot(),'base64');
 await writeFile('evidencias/ddg/js-leaks/sem-monitor-ambiente.json',JSON.stringify({date:new Date().toISOString(),browserVersion:(await driver.getCapabilities()).get('browserVersion'),condition:'Sem extensões, perfil novo',referenceProfile:await driver.findElement(By.css('select')).getAttribute('value')},null,2));
 console.log('Baseline js-leaks sem monitor coletada.');
}finally{await driver.quit();}
