var express = require('express');
var app = express();


// Static pages
app.use(express.static('public'));


// REST end-points
app.get('/orders', (req, res) => {
  let data = [];
  let time = (new Date()).getTime();

  for (let i = -19; i <= 0; i += 1) {
    data.push({
      x: time + i * 1000,
      y: Math.random() * 100
    });
  }
  res.json(data);
});


// Web-sockets
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
wss.on('connection', function connection(ws) {
  console.log('new client connected');

  let k = 0;
  const interval = setInterval(() => {
    let value = Math.random() * 100 + (25 * k++);
    let p = [(new Date()).getTime(), value];
    ws.send(JSON.stringify(p));
  }, 1000);

  ws.on('close', () => clearInterval(interval));
});


server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});