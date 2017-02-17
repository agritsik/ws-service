const redis = require('redis').createClient(6379, '192.168.99.100');
const expect = require('chai').expect;

const KEY = 'top:orders';

describe('Leaderboard', ()=> {


  before(()=> {
    redis.zadd([KEY, 3, 'es']);
    redis.zadd([KEY, 1, 'it']);
    redis.zadd([KEY, 12, 'fr']);
  });

  it('should return the correct count of members', (done)=> {
    redis.zcard([KEY], (err, data) => {
      expect(data).to.be.equal(3);
      done();
    });
  });

  it('should return the top in correct order', (done) => {
    redis.zrevrange([KEY, 0, -1, 'WITHSCORES'], (err, data) => {
      expect(data).to.be.eql(['fr', '12', 'es', '3', 'it', '1']);
      done();
    });
  });

  it('should return a member\'s position', (done) => {
    redis.zrevrank([KEY, 'fr'], (err, data) => {
      expect(data).to.be.equal(0);
      done();
    });
  });

});