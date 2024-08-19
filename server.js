import express from 'express';
import crypto from 'crypto'
import { renderToString } from 'vue/server-renderer';
import { createApp } from './app.js';

const server = express();
//const crypto = require('crypto');
//console.log(crypto.randomBytes(32).toString('hex'));
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypt
const encrypt = (text) => {
  const mykey = crypto.createCipheriv('aes-256-cbc', key, iv);
  let mystr = mykey.update(text, 'utf8', 'hex');
  mystr += mykey.final('hex');
  return mystr;
};

server.get('/', (req, res) => {
  const context = {
    message: encrypt('palabra secreta'),
  };

  const app = createApp(context);

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
  });
});

server.use(express.static('.'));

server.listen(3000, () => {
  console.log('ready');
});
