import test from 'node:test';
import assert from 'node:assert/strict';
import { reconcile } from '../scripts/compare-har.mjs';
test('reconciliação preserva referências do HAR e diferenças nos dois sentidos', () => {
  const har = {log:{entries:[{startedDateTime:'2026-09-23T00:00:00Z',request:{url:'https://a.com/p?uid=secret',method:'GET'},response:{status:200}}]}};
  const plugin = {requests:[{domain:'b.com',id:'1',url:'https://b.com/',blocked:true}]};
  const rows = reconcile(har,plugin,[{domain:'c.com',evidence:'blacklight.png, seção trackers'}],[{domain:'b.com',evidence:'logger.txt linha 10'}]);
  assert.equal(rows.length,3); assert.equal(rows[0].har[0].entry,0); assert.equal(rows[1].ublock.length,1); assert.equal(rows[2].plugin.length,0); assert.ok(!JSON.stringify(rows).includes('secret'));
  assert.throws(() => reconcile(har,plugin,[{domain:'c.com'}]));
});
