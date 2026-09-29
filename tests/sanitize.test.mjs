import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeHar } from '../scripts/sanitize-har.mjs';
test('HAR público preserva estrutura, horários e igualdade sem expor valores',()=>{
 const raw={log:{entries:[{startedDateTime:'2026-09-28T00:00:00Z',request:{url:'https://user:password@a.test/p?uid=token#private',headers:[{name:'Cookie',value:'uid=token; x=secret'},{name:'Authorization',value:'Bearer credential'}],cookies:[{name:'uid',value:'token'}],queryString:[{name:'uid',value:'token'}],postData:{mimeType:'text/plain',text:'private-body'}},response:{status:200,headers:[{name:'Set-Cookie',value:'uid=token; Expires=Wed, 01 Jan 2031 00:00:00 GMT; HttpOnly'}],cookies:[],content:{text:'private-html',mimeType:'text/html'}}}]}};
 const clean=sanitizeHar(raw),e=clean.log.entries[0],output=JSON.stringify(clean);
 for(const value of ['password','token','secret','credential','private-body','private-html'])assert.ok(!output.includes(value),value);
 assert.equal(new URL(e.request.url).searchParams.get('uid'),e.request.cookies[0].value);
 assert.equal(e.response.status,200);assert.equal(e.startedDateTime,raw.log.entries[0].startedDateTime);assert.ok(e.response.headers[0].value.includes('Expires=Wed, 01 Jan 2031'));
 assert.equal(raw.log.entries[0].request.cookies[0].value,'token');
});
