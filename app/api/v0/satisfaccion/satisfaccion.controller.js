var SatisfaccionModel 	= require('./satisfaccion.model'),
    SatisfaccionCollection   = require('./satisfaccion.collection'),
    assert      = require('assert'),
    Connection  = require('../../../config/mongodb'),
    Log         = require('../../../shared/log'),
    merge       = require('merge'),
    controller  = 'test';

(function(){
  // Connection.ejecute(function(err, client){
  //     assert.equal(null, err);
  //      SatisfaccionCollection.initSatisfaccion(client.db());
  //      client.close();
  //   });
})();

module.exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Satisfaccion.create', d : d, body:req.body });
	Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
        SatisfaccionModel.create(client.db(), req.body, function(err, result, status) {
            assert.equal(err, null);
            client.close();
            Log.logEnd({ start : start , response: result});
            //response
            res.status(status).jsonp(result);
        });
    });
};

module.exports.retrieve = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Satisfaccion.retrieve', d : d });
    Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
      SatisfaccionModel.retrieve(client.db(), function(result) {
          client.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:'Satisfaccion.detail', d : d});
    Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
      SatisfaccionModel.detail(client.db(), req.params.id, function(result) {
          client.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.update = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Satisfaccion.update', d : d, body:req.body });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          SatisfaccionModel.update(client.db(), req.params.id, req.body, function(err, result, status) {
              assert.equal(err, null);
              client.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

module.exports.replace = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Satisfaccion.replace', d : d, body:req.body });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          SatisfaccionModel.replace(client.db(), req.params.id, req.body, function(err, result, status) {
              assert.equal(err, null);
              client.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

module.exports.delete = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Satisfaccion.delete', d : d });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          SatisfaccionModel.delete(client.db(), req.params.id, function(err, result, status) {
              assert.equal(err, null);
              client.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

