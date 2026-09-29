import { Builder, By } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';
import { resolve } from 'node:path';
export const monitorUUID = 'eb835908-d407-4f12-b81f-6bb28b018ac1';
export const ublockUUID = '273c0fa7-9a5b-4ea1-9fd8-44f0f1629fba';
export const sites = [
  { id: 'site-1', name: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/' },
  { id: 'site-2', name: 'Magazine Luiza', url: 'https://www.magazineluiza.com.br/' },
  { id: 'site-3', name: 'Wikipédia', url: 'https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal' }
];
export const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
export async function launch() {
  process.env.SE_CACHE_PATH = resolve('.cache/selenium');
  process.env.SE_AVOID_STATS = 'true';
  const options = new firefox.Options().addArguments('-headless').setBrowserVersion('stable')
    .setPageLoadStrategy('eager')
    .setPreference('extensions.webextensions.uuids', JSON.stringify({ 'privacy-monitor@academic.local': monitorUUID, 'uBlock0@raymondhill.net': ublockUUID }))
    .setPreference('devtools.netmonitor.persistlog', true)
    .setPreference('devtools.netmonitor.har.includeResponseBodies', false);
  if (process.env.FIREFOX_BINARY) options.setBinary(process.env.FIREFOX_BINARY);
  const driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).setFirefoxService(new firefox.ServiceBuilder().addArguments('--allow-system-access')).build();
  await driver.manage().setTimeouts({ pageLoad: 60000, script: 90000, implicit: 0 });
  await driver.manage().window().setRect({ width: 1440, height: 1100 });
  return driver;
}
export async function chrome(driver, code, ...args) {
  await driver.setContext('chrome');
  try {
    const result = await driver.executeAsyncScript(`const done = arguments[arguments.length-1]; const args = Array.from(arguments).slice(0,-1); (async()=>{${code}})().then(value=>done({ok:true,value}), error=>done({ok:false,error:String(error),stack:error.stack}));`, ...args);
    if (!result.ok) throw new Error(result.error + '\n' + result.stack);
    return result.value;
  } finally { await driver.setContext('content'); }
}
export async function openExtension(driver, url) {
  await chrome(driver, 'gBrowser.selectedBrowser.loadURI(Services.io.newURI(args[0]), {triggeringPrincipal:Services.scriptSecurityManager.getSystemPrincipal()}); return true;', url);
  await driver.wait(async () => await driver.getCurrentUrl() === url, 15000);
  await driver.wait(async () => await driver.executeScript('return document.readyState') !== 'loading', 15000);
}
export async function extensionCall(driver, message) {
  const result = await driver.executeAsyncScript('const done=arguments[arguments.length-1]; browser.runtime.sendMessage(arguments[0]).then(value=>done({value}),error=>done({error:String(error)}));', message);
  if (result.error) throw new Error(result.error);
  return result.value;
}
export async function openNetwork(driver) {
  return chrome(driver, `
    const {require} = ChromeUtils.importESModule('resource://devtools/shared/loader/Loader.sys.mjs');
    const {gDevTools} = require('resource://devtools/client/framework/devtools.js');
    window.__privacyToolbox = await gDevTools.showToolboxForTab(gBrowser.selectedTab, {toolId:'netmonitor'});
    window.__privacyNet = await window.__privacyToolbox.getNetMonitorAPI();
    return {methods:Object.getOwnPropertyNames(Object.getPrototypeOf(window.__privacyNet)),keys:Object.keys(window.__privacyNet)};
  `);
}
export async function exportHar(driver) {
  return chrome(driver, `return await window.__privacyNet.getHAR();`);
}
export async function saveMonitor(driver, handle, directory, writeFile) {
  await driver.switchTo().newWindow('tab');
  await openExtension(driver, 'moz-extension://' + monitorUUID + '/ui/report.html');
  const tabs = await driver.executeAsyncScript('const done=arguments[arguments.length-1]; browser.tabs.query({}).then(done);');
  const page = tabs.find(t => t.url.startsWith('https://') && t.active === false);
  if (!page) throw new Error('Aba observada não encontrada.');
  await openExtension(driver, `moz-extension://${monitorUUID}/ui/report.html?tab=${page.id}`);
  const report = await extensionCall(driver, {type:'report',tabId:page.id});
  if (!report) throw new Error('Monitor não produziu relatório.');
  await driver.wait(async () => (await driver.findElement(By.id('score')).getText()) === String(report.score.value), 15000);
  await writeFile(directory + '/monitor.json', JSON.stringify(report,null,2));
  await writeFile(directory + '/monitor.png', await driver.takeScreenshot(), 'base64');
  await driver.executeScript('document.querySelector("#signals").scrollIntoView()');
  await writeFile(directory + '/monitor-indicios.png', await driver.takeScreenshot(), 'base64');
  await driver.close(); await driver.switchTo().window(handle);
  return report;
}
