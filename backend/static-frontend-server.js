const httpProxy = require('http-proxy');
var https = require('https');
var http = require('http');
var fs = require('fs');

const proxy = httpProxy.createProxy();
const options = {
    '/': 'http://localhost:3000'
}

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 3000
  }
}).listen(80);

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 3000
  },
  ssl: {
    key: fs.readFileSync('/path/ssl-key.pem', 'utf8'),
    cert: fs.readFileSync('/path/ssl-cert.pem', 'utf8'),
    ca: fs.readFileSync('/path/ca.pem','utf-8')
  }
}).listen(443);