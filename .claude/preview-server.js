const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname.replace(/\/\.claude$/, '');
const TYPES = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json'};
http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const fp = path.join(ROOT, p);
  fs.readFile(fp, (e, buf) => {
    if (e) { res.writeHead(404, {'content-type':'text/plain'}); res.end('404'); return; }
    res.writeHead(200, {'content-type': TYPES[path.extname(fp).toLowerCase()] || 'application/octet-stream'});
    res.end(buf);
  });
}).listen(4173, '127.0.0.1', () => console.log('serving', ROOT, 'on http://127.0.0.1:4173'));
