const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 3000;


//Proxy für Outlook/Kalender
const sendCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'OPTIONS') {
    sendCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (parsedUrl.pathname !== '/proxy') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const target = parsedUrl.query.url;
  if (!target) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Missing url parameter');
    return;
  }

  const targetUrl = url.parse(target);
  const client = targetUrl.protocol === 'https:' ? https : http;

  const proxyReq = client.get(target, (proxyRes) => {
    sendCorsHeaders(res);
    res.writeHead(proxyRes.statusCode || 502, {
      'Content-Type': proxyRes.headers['content-type'] || 'application/octet-stream'
    });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (error) => {
    sendCorsHeaders(res);
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Proxy error: ' + error.message);
  });
});

server.listen(PORT, () => {
  console.log(`ICS proxy läuft auf http://localhost:${PORT}`);
});
