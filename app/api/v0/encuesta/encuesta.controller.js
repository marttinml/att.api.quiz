var EncuestaModel 	= require('./encuesta.model'),
    EncuestaCollection   = require('./encuesta.collection'),
    assert      = require('assert'),
    Connection  = require('../../../config/mongodb'),
    Log         = require('../../../shared/log'),
    merge       = require('merge'),
    controller  = 'test';

(function(){
  // Connection.ejecute(function(err, db){
  //     assert.equal(null, err);
  //      EncuestaCollection.initEncuesta(db);
  //      db.close();
  //   });
})();

module.exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Encuesta.create', d : d, body:req.body });
	Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
        EncuestaModel.create(client.db(), req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'Encuesta.retrieve', d : d });
    Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
      EncuestaModel.retrieve(client.db(), function(result) {
        client.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:'Encuesta.detail', d : d, body:req.params.id });
    Connection.ejecute(function(err, client){
      assert.equal(null, err);
        //ejecute query
      EncuestaModel.detail(client.db(), req.params.id, function(result, status) {
          client.close();
          Log.logEnd({ start : start , response: result});
          res.status(status).jsonp(result);
      });
    });
};

module.exports.update = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'Encuesta.update', d : d, body:req.body });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          EncuestaModel.update(client.db(), req.params.id, req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'Encuesta.replace', d : d, body:req.body });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          EncuestaModel.replace(client.db(), req.params.id, req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'Encuesta.delete', d : d });
  Connection.ejecute(function(err, client){
        assert.equal(null, err);
        //ejecute query
          EncuestaModel.delete(client.db(), req.params.id, function(err, result, status) {
              assert.equal(err, null);
              client.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

