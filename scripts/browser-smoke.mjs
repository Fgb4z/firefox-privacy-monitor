// Teste real em Firefox headless isolado. Não conta como validação DDG ou dos sites sorteados.
import { Builder, By } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

process.env.SE_CACHE_PATH = resolve('.cache/selenium');
process.env.SE_AVOID_STATS = 'true';
const uuid = 'eb835908-d407-4f12-b81f-6bb28b018ac1';
const options = new firefox.Options().addArguments('-headless').setBrowserVersion('stable')
  .setPreference('extensions.webextensions.uuids', JSON.stringify({ 'privacy-monitor@academic.local': uuid }));
if (process.env.FIREFOX_BINARY) options.setBinary(process.env.FIREFOX_BINARY);
await mkdir('evidencias/locais', { recursive: true });
const fixture = spawn(process.execPath, ['scripts/fixture-server.mjs'], { stdio: ['ignore', 'pipe', 'inherit'], windowsHide: true });
await new Promise((ok, fail) => { fixture.stdout.once('data', ok); fixture.once('error', fail); fixture.once('exit', code => fail(new Error(`Fixture encerrou: ${code}`))); });
let driver;
try {
  console.log('Obtendo Firefox e geckodriver isolados para o smoke test…');
  driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).setFirefoxService(new firefox.ServiceBuilder().addArguments('--allow-system-access')).build();
  await driver.manage().window().setRect({ width: 1200, height: 1000 });
  await driver.installAddon(resolve('extension'), true);
  const openPanel = async url => {
    await driver.setContext('chrome');
    await driver.executeScript('gBrowser.selectedBrowser.loadURI(Services.io.newURI(arguments[0]), {triggeringPrincipal:Services.scriptSecurityManager.getSystemPrincipal()});', url);
    await driver.setContext('content');
    await driver.wait(async () => (await driver.getCurrentUrl()) === url, 10000);
    await driver.wait(async () => (await driver.findElements(By.id('refresh'))).length > 0, 10000);
  };
  await driver.get('http://localhost:8787');
  const pageHandle = await driver.getWindowHandle();
  await driver.wait(async () => (await driver.findElement(By.id('done')).getText()).includes('disparadas'), 15000);
  // Janela mínima do detector de polling. Não é um teste de tempo de resposta.
  await new Promise(r => setTimeout(r, 16000));
  await driver.switchTo().newWindow('tab');
  await openPanel(`moz-extension://${uuid}/ui/report.html`);
  const panelHandle = await driver.getWindowHandle();
  const tabs = await driver.executeAsyncScript('const done=arguments[arguments.length-1]; browser.tabs.query({}).then(done);');
  const observed = tabs.find(t => t.url.startsWith('http://localhost:8787'));
  assert.ok(observed, 'Aba da fixture encontrada');
  await openPanel(`moz-extension://${uuid}/ui/report.html?tab=${observed.id}`);
  const readReport = () => driver.executeAsyncScript('const done=arguments[arguments.length-1]; browser.runtime.sendMessage({type:"report",tabId:arguments[0]}).then(done);', observed.id);
  const report = await readReport();
  await writeFile('evidencias/locais/fixture-monitor.json', JSON.stringify(report, null, 2));
  await writeFile('evidencias/locais/fixture-monitor.png', await driver.takeScreenshot(), 'base64');
  const APIs = report.events.filter(e => e.kind === 'storage').map(e => e.api);
  assert.ok(report.events.some(e => e.kind === 'coverage' && e.outcome === 'ready'), 'Content script carregado');
  assert.ok(APIs.includes('localStorage.setItem'), `localStorage observado: ${APIs}`);
  assert.ok(APIs.includes('sessionStorage.setItem'), 'sessionStorage observado');
  assert.ok(APIs.includes('IndexedDB.open'), 'IndexedDB observado');
  assert.ok(report.events.some(e => e.kind === 'canvas'), 'Canvas observado');
  assert.ok(report.events.some(e => e.kind === 'hook' && e.api === 'window.fetch'), 'Hook de fetch observado');
  assert.ok(!report.events.some(e => e.kind === 'hook' && e.api !== 'window.fetch'), 'Wrappers próprios não são falsos indicadores de hook');
  assert.ok(report.signals.some(e => e.kind === 'polling'), 'Polling observado');
  assert.ok(report.signals.some(e => e.kind === 'cookie-sync'), 'Correlação cookie/query observada');
  assert.ok(report.cookieAttempts.some(c => c.name === 'http_session' && c.session), 'Cookie HTTP de sessão observado');
  assert.ok(report.cookieAttempts.some(c => c.name === 'http_persistent' && !c.session), 'Cookie HTTP persistente observado');
  assert.ok(report.events.some(e => e.kind === 'cookie-write'), 'Tentativa document.cookie observada');
  assert.ok(report.events.some(e => e.kind === 'storage' && e.thirdParty), 'Armazenamento em iframe terceiro observado');
  await driver.executeAsyncScript('const done=arguments[arguments.length-1]; browser.runtime.sendMessage({type:"save-rules",rules:["127.0.0.1"]}).then(done);');
  await driver.switchTo().window(pageHandle); await driver.navigate().refresh(); await new Promise(r => setTimeout(r, 4000));
  await driver.switchTo().window(panelHandle); await driver.navigate().refresh();
  const blocked = await readReport(); assert.ok(blocked.requests.some(r => r.domain === '127.0.0.1' && r.blocked), 'Bloqueio de terceiro aplicado');
  assert.ok(!blocked.events.some(e => e.thirdParty), 'Frame bloqueado não executa instrumentação');
  await writeFile('evidencias/locais/fixture-bloqueio.json', JSON.stringify(blocked, null, 2));
  await writeFile('evidencias/locais/fixture-bloqueio.png', await driver.takeScreenshot(), 'base64');
  await driver.executeAsyncScript('const done=arguments[arguments.length-1]; browser.runtime.sendMessage({type:"save-rules",rules:[]}).then(done);');
  await driver.switchTo().window(pageHandle); await driver.get('http://localhost:8787/bounce');
  await driver.switchTo().window(panelHandle); await driver.navigate().refresh();
  const bounce = await readReport(); assert.ok(bounce.signals.some(s => s.kind === 'bounce'), 'Bounce HTTP observado');
  await writeFile('evidencias/locais/fixture-bounce.json', JSON.stringify(bounce, null, 2));
  await writeFile('evidencias/locais/fixture-bounce.png', await driver.takeScreenshot(), 'base64');
  const capabilities = await driver.getCapabilities();
  await writeFile('evidencias/locais/execucao.json', JSON.stringify({ date: new Date().toISOString(), browser: capabilities.get('browserName'), version: capabilities.get('browserVersion'), mode:'headless, perfil isolado Selenium, fixture sintética', checks:16, result:'PASS', doesNotReplace:'Testes DDG, HARs DevTools e análise dos três sites sorteados.' }, null, 2));
  console.log('Smoke test Firefox: PASS — detecções básicas, avançadas, bloqueio e bounce.');
} finally { if (driver) await driver.quit(); fixture.kill(); }
