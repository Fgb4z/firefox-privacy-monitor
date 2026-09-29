import { launch, chrome, openNetwork } from './browser-session.mjs';
const driver = await launch();
try {
  console.log('DevTools:', await openNetwork(driver));
  console.log('HAR implementation:', await chrome(driver,'return String(window.__privacyNet.getHAR);'));
  console.log('Network prototype:', await chrome(driver,'return Object.getOwnPropertyNames(Object.getPrototypeOf(window.__privacyNet)).map(k=>[k,String(window.__privacyNet[k]).slice(0,800)]);'));
} finally { await driver.quit(); }
