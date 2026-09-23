import { build } from 'esbuild';
import { mkdir, copyFile } from 'node:fs/promises';
await build({ entryPoints: ['src/background.js', 'src/content.js', 'src/report.js'], outdir: 'extension/dist', bundle: true, target: 'firefox142', format: 'iife', legalComments: 'eof' });
await mkdir('extension/licenses', { recursive: true });
await copyFile('node_modules/tldts/LICENSE', 'extension/licenses/tldts.txt');
await copyFile('node_modules/tldts-core/LICENSE', 'extension/licenses/tldts-core.txt');
console.log('Extensão pronta em extension/manifest.json');
