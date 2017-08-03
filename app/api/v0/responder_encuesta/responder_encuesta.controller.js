var ResponderEncuestaModel 	= require('./responder_encuesta.model'),
    ResponderEncuestaCollection   = require('./responder_encuesta.collection'),
    EncuestaModel   = require('../encuesta/encuesta.model'),
    assert      = require('assert'),
    Connection  = require('../../../config/mongodb'),
    Log         = require('../../../shared/log'),
    merge       = require('merge'),
    controller  = 'test';

(function(){
  // Connection.ejecute(function(err, db){
  //     assert.equal(null, err);
  //      ResponderEncuestaCollection.initResponderEncuesta(db);
  //      db.close();
  //   });
})();

module.exports.create = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'ResponderEncuesta.create', d : d, body:req.body });

	Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query

        EncuestaModel.detail(db, req.body.idEncuesta,function(encuesta, status){

          if(status === 200){
            

              var data = {
                encuesta    : encuesta,
                preguntasList   : req.body.preguntas,
                tipoEncuesta: encuesta.tipoEncuesta
              };
              ResponderEncuestaModel.create(db, data, function(err, result, status) {
                assert.equal(err, null);
                db.close();
                Log.logEnd({ start : start , response: result});
                //response
                res.status(status).jsonp(result);
            });

          }else{
            res.status(201).jsonp(req.body);
          };

        });
        
    });
};

module.exports.retrieve = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'ResponderEncuesta.retrieve', d : d });
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      ResponderEncuestaModel.retrieve(db, function(result) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.detail = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:'ResponderEncuesta.detail', d : d});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
      ResponderEncuestaModel.detail(db, req.params.id, function(result) {
          db.close();
          Log.logEnd({ start : start , response: result});
          res.status(200).jsonp(result);
      });
    });
};

module.exports.update = function (req, res) {
    var d   = new Date();
    start   = d.getMilliseconds();
    Log.logStart({controller : controller, method:'ResponderEncuesta.update', d : d, body:req.body });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          ResponderEncuestaModel.update(db, req.params.id, req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'ResponderEncuesta.replace', d : d, body:req.body });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          ResponderEncuestaModel.replace(db, req.params.id, req.body, function(err, result, status) {
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
    Log.logStart({controller : controller, method:'ResponderEncuesta.delete', d : d });
  Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query
          ResponderEncuestaModel.delete(db, req.params.id, function(err, result, status) {
              assert.equal(err, null);
              db.close();
              Log.logEnd({ start : start , response: result});
              //response
              res.status(status).jsonp(result);
          });
    });
};


module.exports.indicadores = function (req, res) {
    var d   = new Date();
        start   = d.getMilliseconds();
        Log.logStart({controller : controller, method:'ResponderEncuesta.detail', d : d});
    Connection.ejecute(function(err, db){
        assert.equal(null, err);
        //ejecute query

        EncuestaModel.detail(db, req.params.id,function(encuesta, status){

          if(status === 200){
                ResponderEncuestaModel.indicadores(db, encuesta, function(result) {
                  db.close();
                  Log.logEnd({ start : start , response: result});
                  res.status(200).jsonp(result);
              });
          }else{
            var result = {encuesta:req.params.id, mensaje:"No Existe", respondida:0};
            res.status(201).jsonp(result);
          }
      });
    });
};

