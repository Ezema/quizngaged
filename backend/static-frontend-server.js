const httpProxy = require('http-proxy');
var https = require('https');
var fs = require('fs');

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 3000
  }
}).listen(80);

const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.quizngaged.ml/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.quizngaged.ml/fullchain.pem', 'utf8'),    
};

//redirect https to http
const httpsServer = https.createServer(credentials,function (req, res) {
  res.writeHead(301, { "Location": "http://" + req.headers['host'] + req.url });
  res.end();
}).listen(443);
