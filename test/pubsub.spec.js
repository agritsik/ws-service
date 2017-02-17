const pub = require('redis').createClient(6379, '192.168.99.100');
const sub = require('redis').createClient(6379, '192.168.99.100');
const expect = require('chai').expect;

const CHANNEL = 'new:orders';

describe('PubSub', () => {

  before((done) => {
    sub.subscribe(CHANNEL, done);
  });

  it('should consume a message', (done) => {

    pub.publish(CHANNEL, 'hi there');

    sub.on('message', (ch, message) => {
      expect(message).to.be.equal('hi there');
      done();
    });

  });


});

