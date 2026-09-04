import { appendFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { createServer } from 'node:http';

const host = process.env.NEWSLETTER_HOST || '127.0.0.1';
const port = Number(process.env.NEWSLETTER_PORT || 4174);
const dataFile = process.env.NEWSLETTER_DATA_FILE || '/var/lib/satoshihub/subscribers.csv';
const staticRoot = resolve(process.env.STATIC_ROOT || 'dist');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const subscribers = new Set();
const recentRequests = new Map();
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const csvCell = (value) => `"${String(value).replaceAll('"', '""')}"`;

async function loadSubscribers() {
  await mkdir(dirname(dataFile), { recursive: true });

  try {
    const rows = await readFile(dataFile, 'utf8');
    for (const row of rows.split(/\r?\n/).slice(1)) {
      const match = row.match(/^"((?:[^"]|"")*)"/);
      if (match) subscribers.add(match[1].replaceAll('""', '"').toLowerCase());
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await appendFile(dataFile, 'email,subscribed_at,ip\n', { mode: 0o600 });
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(payload));
}

function clientIp(request) {
  return String(request.headers['x-forwarded-for'] || request.socket.remoteAddress || '')
    .split(',')[0]
    .trim();
}

function isRateLimited(ip) {
  const now = Date.now();
  const requests = (recentRequests.get(ip) || []).filter((time) => now - time < 60_000);
  requests.push(now);
  recentRequests.set(ip, requests);
  return requests.length > 10;
}

async function serveStatic(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendJson(response, 404, { ok: false });
    return;
  }

  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host || 'localhost'}`).pathname);
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  let filePath = resolve(join(staticRoot, requestedPath));

  if (!filePath.startsWith(`${staticRoot}\\`) && !filePath.startsWith(`${staticRoot}/`) && filePath !== staticRoot) {
    sendJson(response, 403, { ok: false });
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': filePath.endsWith('.html') ? 'no-cache' : 'public, max-age=2592000, immutable',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : file);
  } catch (error) {
    if (error.code !== 'ENOENT' || extname(filePath)) {
      sendJson(response, 404, { ok: false });
      return;
    }

    filePath = join(staticRoot, 'index.html');
    const file = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes['.html'], 'Cache-Control': 'no-cache' });
    response.end(request.method === 'HEAD' ? undefined : file);
  }
}

await loadSubscribers();

createServer((request, response) => {
  if (request.url !== '/api/newsletter') {
    serveStatic(request, response).catch(() => sendJson(response, 500, { ok: false }));
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 404, { ok: false });
    return;
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    sendJson(response, 429, { ok: false, message: 'Too many requests.' });
    return;
  }

  let body = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => {
    body += chunk;
    if (body.length > 2048) request.destroy();
  });
  request.on('end', async () => {
    try {
      const email = String(JSON.parse(body).email || '').trim().toLowerCase();
      if (email.length > 254 || !emailPattern.test(email)) {
        sendJson(response, 400, { ok: false, message: 'Enter a valid email address.' });
        return;
      }

      if (!subscribers.has(email)) {
        const row = `${csvCell(email)},${csvCell(new Date().toISOString())},${csvCell(ip)}\n`;
        await appendFile(dataFile, row, { mode: 0o600 });
        subscribers.add(email);
      }

      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 400, { ok: false, message: 'Invalid request.' });
    }
  });
}).listen(port, host, () => {
  console.log(`Newsletter service listening on http://${host}:${port}`);
});
