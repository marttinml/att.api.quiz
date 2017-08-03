var TipoEncuestaModel 	= require('./tipo_encuesta.model'),
    TipoEncuestaCollection   = require('./tipo_encuesta.collection'),
    assert      = require('assert'),
    Connection  = require('../../../config/mongodb'),
    Log         = require('../../../shared/log'),
    merge       = require('merge'),
    controller  = 'test';

(function(){
  // Connection.ejecute(function(err, db){
  //     assert.equal(null, err);
  //      TipoEncuestaCollection.initTipoEncuesta(db);
  //      db.close();
  //   });
})();

module.exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'TipoEncuesta.create', d : d, body:req.body });
	Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
        TipoEncuestaModel.create(db, req.body, function(err, result, status) {
            assert.equal(err, null);
            db.close();
            Log.logEnd({ start : start , response: result});
            //response
            res.status(status).jsonp(result);
        });
    });
};

module.exports.retrieve = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'TipoEncuesta.retrieve', d : d });
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      TipoEncuestaModel.retrieve(db, function(result) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:'TipoEncuesta.detail', d : d});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      TipoEncuestaModel.detail(db, req.params.id, function(result) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.update = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'TipoEncuesta.update', d : d, body:req.body });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          TipoEncuestaModel.update(db, req.params.id, req.body, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

module.exports.replace = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'TipoEncuesta.replace', d : d, body:req.body });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          TipoEncuestaModel.replace(db, req.params.id, req.body, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

module.exports.delete = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'TipoEncuesta.delete', d : d });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          TipoEncuestaModel.delete(db, req.params.id, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};

