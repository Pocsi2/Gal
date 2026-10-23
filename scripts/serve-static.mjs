import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const contentTypes = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.webp': 'image/webp',
};
const port = Number(process.env.PORT ?? 4173);

http.createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Bad request'); return; }
  const relative = pathname.replace(/^\/+/, '');
  let target = path.resolve(root, relative || 'index.html');
  if (!target.startsWith(root + path.sep) && target !== path.join(root, 'index.html')) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const info = await fs.stat(target);
    if (info.isDirectory()) target = path.join(target, 'index.html');
  } catch {
    if (!path.extname(target)) target = path.join(target, 'index.html');
  }
  try {
    const body = await fs.readFile(target);
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(target)] ?? 'application/octet-stream' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}).listen(port, () => console.log(`Static preview: http://localhost:${port}`));
