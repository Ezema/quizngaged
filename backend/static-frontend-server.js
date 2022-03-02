const httpProxy = require('http-proxy');
var https = require('https');
var http = require('http');
var fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

/* httpProxy.createServer({
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
    key: fs.readFileSync('/etc/letsencrypt/live/www.quizngaged.ml/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.quizngaged.ml/fullchain.pem', 'utf8'),    
  }
}).listen(443); */

const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.quizngaged.ml/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.quizngaged.ml/fullchain.pem', 'utf8'),    
};

const app = express()

app.use('/', createProxyMiddleware({ target: 'localhost:3000', changeOrigin: true }));
app.use('/API', createProxyMiddleware({ target: 'localhost:9000', changeOrigin: true }));

// Starting both http & https servers
const httpServer = http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
});

const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
console.log('HTTPS Server running on port 443');
});

 