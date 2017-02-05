var express = require('express');
var app = express();

// ws specific
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
wss.on('connection', function connection(ws) {
  console.log('new client connected');

  const interval = setInterval(() => {
    ws.send("ping");
  }, 1000);

  ws.on('close', () => clearInterval(interval));

  ws.on('message', (message) => console.log('received: %s', message));

});

app.use(express.static('public'));
server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});