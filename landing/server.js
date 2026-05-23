// server.js (custom Next server)
const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: '.',
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.error('Server error:', err);
      process.exit(1);
    }
    console.log(`> Ready on http://0.0.0.0:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch((ex) => {
  console.error('Failed to start server:', ex);
  process.exit(1);
});
