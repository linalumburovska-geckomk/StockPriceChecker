/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('All stocks', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body,'stockData')        
          done();
        });
      });
      
      test('1 stock with stock', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({"stock": "GOOG"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body,'stockData')  
          assert.isArray(res.body.stockData); 
          assert.equal(res.body.stockData[0].stock,'GOOG')
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({"stock": "GOOG", "like": true})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body,'stockData')  
          assert.isArray(res.body.stockData); 
          assert.equal(res.body.stockData[0].stock,'GOOG')
          assert.equal(res.body.stockData[0].like,true)
          done();
        });
      });
      
      
    });

});
