process.env.NODE_ENV='production';
const { createServer } = require('http');
const next = require('next');

const app = next({ dev:false, dir:__dirname });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req,res) => handle(req,res)).listen(port, '127.0.0.1', () => {
    console.log('WorldBrand ready on port ' + port);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
