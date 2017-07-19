/* global describe it */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { gMapErrMsg, noCommandErrMsg } from '../errorMessages';

const expect = chai.use(chaiHttp).expect;


describe('api methods', function() {

  describe('greet user', function(){
    it('should respond by greeting user if action is "join"', function() {
      return chai.request('http://localhost:9000')
        .post('/chat/messages')
        .field('action', 'join')
        .field('user_id', 134234)
        .field('name', 'John')
        .then(function(res) {
          expect(res.body).to.deep.include({
            'messages': [
              {
                'type': 'text',
                'text': 'Hey John, what\'s up?'
              }
            ]
          });
        });
    });
    it('should respond with 403 status if no action', function() {
      return chai.request('http://localhost:9000')
        .post('/chat/messages')
        .field('action', '')
        .field('user_id', 134234)
        .field('name', 'John')
        .catch(function(err) {
          expect(err).to.have.status(403);
        });
    });
  });

  describe('find location', function(){
    it('should contain the location name when query contains: <Location> weather', function() {
      return chai.request('http://localhost:9000')
        .post('/chat/messages')
        .field('action', 'message')
        .field('user_id', 134234)
        .field('text', 'berlin weather')
        .then(function(res) {
          expect(res.body.messages[0].text).includes('right now for Berlin');
        });
    });
    it('should contain the location name when query contains: weather in <Location>', function() {
      return chai.request('http://localhost:9000')
        .post('/chat/messages')
        .field('action', 'message')
        .field('user_id', 134234)
        .field('text', 'weather in berlin')
        .then(function(res) {
          expect(res.body.messages[0].text).includes('right now for Berlin');
        });
    });
    it('should contain the location name when query contains: what\'s the weather in <Location>', function() {
      return chai.request('http://localhost:9000')
        .post('/chat/messages')
        .field('action', 'message')
        .field('user_id', 134234)
        .field('text', 'what\'s the weather in berlin')
        .then(function(res) {
          expect(res.body.messages[0].text).includes('right now for Berlin');
        });
    });
    it('should response with "command hint" when no command is sent', function() {
      return chai.request('http://localhost:9000')
        .post('/chat/messages')
        .field('action', 'message')
        .field('user_id', 134234)
        .field('text', 'some random sentence')
        .then(function(res) {
          expect(res.body.messages[0].text).to.have.string(noCommandErrMsg);
        });
    });
    // for this one the gmap api will return something for a lot of nonsense input
    // e.g. address=locationthatdoesnotexist returns a valid address
    it('should response with "g map error" when location does not exist', function() {
      return chai.request('http://localhost:9000')
        .post('/chat/messages')
        .field('action', 'message')
        .field('user_id', 134234)
        .field('text', 'weather in some random location that does not exist')
        .then(function(res) {
          expect(res.body.messages[0].text).to.have.string(gMapErrMsg);
        });
    });
  });
});
