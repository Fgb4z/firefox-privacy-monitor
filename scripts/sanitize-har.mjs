import { createHash } from 'node:crypto';
export const digest = value => 'sha256:' + createHash('sha256').update(String(value)).digest('hex').slice(0, 20);
function url(value) {
  try { const u = new URL(value); u.username = ''; u.password = ''; u.hash = ''; const entries = [...u.searchParams]; u.search = ''; for (const [key,v] of entries) u.searchParams.append(key, digest(v)); return u.href; } catch { return value; }
}
function cookies(header) { return header.split(/;\s*/).map(part => {const pos=part.indexOf('=');return pos<0?part:part.slice(0,pos+1)+digest(part.slice(pos+1));}).join('; '); }
function initiator(value) {
  if (typeof value === 'string') return /^https?:\/\//.test(value) ? url(value) : value;
  if (Array.isArray(value)) return value.map(initiator);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,initiator(v)]));
  return value;
}
function headers(list) { return (list || []).map(h => { const key=h.name.toLowerCase(); let value=h.value; if (['authorization','proxy-authorization','x-forwarded-for','forwarded','x-real-ip'].includes(key)) value='[REDACTED]'; else if(key==='cookie') value=cookies(value); else if(key==='set-cookie') value=value.split(/\r?\n/).map(line=>{ const parts=line.split(';'); parts[0]=cookies(parts[0]); return parts.join(';'); }).join('\n'); else if (['location','referer'].includes(key)) value=url(value); return {...h,value}; }); }
export function sanitizeHar(raw) {
  const har = structuredClone(raw);
  for (const e of har.log.entries) {
    e.request.url = url(e.request.url);
    for (const key of ['_initiator','_initiator_detail']) if(e[key]) e[key]=initiator(e[key]);
    for (const side of [e.request,e.response]) { side.headers=headers(side.headers); side.cookies=(side.cookies||[]).map(c=>({...c,value:digest(c.value)})); }
    e.request.queryString=(e.request.queryString||[]).map(q=>({...q,value:digest(q.value)}));
    if(e.request.postData) e.request.postData={mimeType:e.request.postData.mimeType,comment:'Corpo omitido na cópia pública.'};
    if(e.response.content) {delete e.response.content.text;delete e.response.content.encoding;}
    if(e.response.redirectURL) e.response.redirectURL=url(e.response.redirectURL);
  }
  har.log.comment='Exportado pelo Firefox DevTools NetMonitorAPI.getHar/HarExporter. Cópia pública: valores de query e cookies substituídos por SHA-256 truncado consistente; autenticação, corpos e fragmentos omitidos. Original privado em .cache/evidence-originals.';
  return har;
}
