var kafka = require('kafka-node'),
  Producer = kafka.Producer,
  client = new kafka.Client('localhost:2181'),
  producer = new Producer(client),
  payloads = [
    { topic: 'orders', messages: '{"country": "HOHO1"}'},
  ];

producer.on('ready', function () {
  producer.send(payloads, function (err, data) {
    console.log(err);
    console.log(data);
  });
});

producer.on('error', function (err) {});