var express = require('express');
var app = express();
const TIMEOUT = 3000; // for grouping events


// Static pages
app.use(express.static('public'));


// REST end-points
app.get('/orders', (req, res) => {
  res.json(getInitialData());
});


// Web-sockets
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
wss.on('connection', function connection(ws) {
  console.log('new client connected');

  let i = 0;
  const interval = setInterval(() => {
    ws.send(JSON.stringify(getUpdate(i++)));
  }, TIMEOUT);

  ws.on('close', () => clearInterval(interval));
});


server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


// DEMO


/**
 * Imitates data from storage
 * @returns {*[]}
 */
function getInitialData() {
  let data0 = [];
  let data1 = [];
  let data2 = [];

  for (let i = -19; i <= 0; i += 1) {
    data0.push({x: _getTime() + i * TIMEOUT, y: _getValue(1200)});
    data1.push({x: _getTime() + i * TIMEOUT, y: _getValue(1700)});
    data2.push({x: _getTime() + i * TIMEOUT, y: _getValue(1800)});
  }
  return [data0, data1, data2];
}

/**
 * Imitates new changes (events)
 * @returns {*[]}
 */
function getUpdate(i) {
  return [
    [(new Date()).getTime(), _getValue(1200)],
    [(new Date()).getTime(), _getValue(1700) + i * 50],
    [(new Date()).getTime(), _getValue(1800) - i * 50],
  ];
}

function _getTime() {
  return (new Date()).getTime();
}

function _getValue(min) {
  return min + Math.random() * 100;
}
