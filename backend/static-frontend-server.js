const httpProxy = require('http-proxy');
//var https = require('https');
var fs = require('fs');

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 2049
  }
}).listen(2048);
