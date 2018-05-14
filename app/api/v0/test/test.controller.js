var TestModel 	= require('./test.model'),
    assert      = require('assert'),
    Connection  = require('../../../config/mongodb'),
    Log         = require('../../../shared/log'),
    merge       = require('merge'),
    controller  = 'test';

module.exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Test.create', d : d, body:req.body });
	Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
        TestModel.create(client.db(), req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'Test.retrieve', d : d });
    Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
      TestModel.retrieve(client.db(), function(result) {
          client.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:'Test.detail', d : d});
    Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
      TestModel.detail(client.db(), req.params.id, function(result) {
          client.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.update = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Test.update', d : d, body:req.body });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          TestModel.update(client.db(), req.params.id, req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'Test.replace', d : d, body:req.body });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          TestModel.replace(client.db(), req.params.id, req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'Test.delete', d : d });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          TestModel.delete(client.db(), req.params.id, function(err, result, status) {
              assert.equal(err, null);
              client.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

