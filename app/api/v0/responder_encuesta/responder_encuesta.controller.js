var ResponderEncuestaModel = require('./responder_encuesta.model'),
    ResponderEncuestaCollection = require('./responder_encuesta.collection'),
    EncuestaModel = require('../encuesta/encuesta.model'),
    assert = require('assert'),
    Connection = require('../../../config/mongodb'),
    Log = require('../../../shared/log'),
    merge = require('merge'),
    controller = 'test';

(function () {
    // Connection.ejecute(function(err, db){
    //     assert.equal(null, err);
    //      ResponderEncuestaCollection.initResponderEncuesta(client.db());
    //      db.close();
    //   });
})();

module.exports.create = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.create', d: d, body: req.body });

    Connection.ejecute(function (err, client) {
        assert.equal(null, err);

        EncuestaModel.detail(client.db(), req.body.idEncuesta, function (encuesta, status) {

            if (encuesta.success) {

                if (encuesta.data.tipoEncuesta.id === 3 || encuesta.data.tipoEncuesta.id === 4 ) {

                    if (encuesta.data.tipoEncuesta.id === 3 ) {
                        ResponderEncuestaModel.validar_examen(client.db(), req.body.idEncuesta, req.body.attuid, function (status, response) {
                            if (response.success) {
                                var data = {
                                    encuesta: encuesta.data,
                                    preguntasList: req.body.preguntas,
                                    tipoEncuesta: encuesta.data.tipoEncuesta,
                                    attuid: req.body.attuid,
                                    nombre: req.body.nombre,
                                    wr: req.body.wr,
                                    comentario: req.body.comentario
                                };
                                ResponderEncuestaModel.create(client.db(), data, function (err, result, status) {
                                    assert.equal(err, null);
                                    client.close();
                                    Log.logEnd({ start: start, response: result });
                                    //response
                                    res.status(status).jsonp(result);
                                });

                            }
                            else {
                                res.status(status).jsonp(response);
                            }
                        });
                    }
                    if (encuesta.data.tipoEncuesta.id === 4 ) {
                        var data = {
                            encuesta: encuesta.data,
                            preguntasList: req.body.preguntas,
                            tipoEncuesta: encuesta.data.tipoEncuesta,
                            attuid: req.body.attuid,
                            nombre: req.body.nombre,
                            wr: req.body.wr,
                            comentario: req.body.comentario
                        };
                        ResponderEncuestaModel.create(client.db(), data, function (err, result, status) {
                            assert.equal(err, null);
                            client.close();
                            Log.logEnd({ start: start, response: result });
                            //response
                            res.status(status).jsonp(result);
                        });
                    }
                }
                else {
                    var data = {
                        encuesta: encuesta.data,
                        preguntasList: req.body.preguntas,
                        tipoEncuesta: encuesta.data.tipoEncuesta,
                        attuid: req.body.attuid,
                        nombre: req.body.nombre
                    };
                    ResponderEncuestaModel.create(client.db(), data, function (err, result, status) {
                        assert.equal(err, null);
                        client.close();
                        Log.logEnd({ start: start, response: result });
                        //response
                        res.status(status).jsonp(result);
                    });
                }
            } else {
                res.status(status).jsonp(encuesta);
            };

        });

    });
};

module.exports.retrieve = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.retrieve', d: d });
    Connection.ejecute(function (err, db) {
        assert.equal(null, err);
        //ejecute query
        ResponderEncuestaModel.retrieve(client.db(), function (result) {
            db.close();
            Log.logEnd({ start: start, response: result });
            res.status(200).jsonp(result);
        });
    });
};

module.exports.detail = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.detail', d: d });
    Connection.ejecute(function (err, db) {
        assert.equal(null, err);
        //ejecute query
        ResponderEncuestaModel.detail(client.db(), req.params.id, function (result) {
            db.close();
            Log.logEnd({ start: start, response: result });
            res.status(200).jsonp(result);
        });
    });
};

module.exports.update = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.update', d: d, body: req.body });
    Connection.ejecute(function (err, db) {
        assert.equal(null, err);
        //ejecute query
        ResponderEncuestaModel.update(client.db(), req.params.id, req.body, function (err, result, status) {
            assert.equal(err, null);
            db.close();
            Log.logEnd({ start: start, response: result });
            //response
            res.status(status).jsonp(result);
        });
    });
};

module.exports.replace = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.replace', d: d, body: req.body });
    Connection.ejecute(function (err, db) {
        assert.equal(null, err);
        //ejecute query
        ResponderEncuestaModel.replace(client.db(), req.params.id, req.body, function (err, result, status) {
            assert.equal(err, null);
            db.close();
            Log.logEnd({ start: start, response: result });
            //response
            res.status(status).jsonp(result);
        });
    });
};

module.exports.delete = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.delete', d: d });
    Connection.ejecute(function (err, db) {
        assert.equal(null, err);
        //ejecute query
        ResponderEncuestaModel.delete(client.db(), req.params.id, function (err, result, status) {
            assert.equal(err, null);
            db.close();
            Log.logEnd({ start: start, response: result });
            //response
            res.status(status).jsonp(result);
        });
    });
};


module.exports.indicadores = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.detail', d: d });
    Connection.ejecute(function (err, client) {
        assert.equal(null, err);
        //ejecute query

        ResponderEncuestaModel.detail_indicadores(client.db(), req.params.id, function (encuesta, status) {

            if (encuesta.success) {
                ResponderEncuestaModel.indicadores(client.db(), encuesta.data, function (result) {
                    client.close();
                    Log.logEnd({ start: start, response: result });
                    res.status(status).jsonp(result);
                });
            } else {
                //var result = { encuesta: req.params.id, mensaje: "No Existe", respondida: 0 };
                res.status(status).jsonp(encuesta);
            }
        });
    });
};

module.exports.validar_examen = function (req, res) {
    var d = new Date();
    start = d.getMilliseconds();
    Log.logStart({ controller: controller, method: 'ResponderEncuesta.validar_examen', d: d, body: req.body });

    Connection.ejecute(function (err, client) {
        assert.equal(null, err);

        ResponderEncuestaModel.validar_examensolo(client.db(), req.body.idEncuesta, req.body.attuid, function (status, response) {
            res.status(status).jsonp(response);

        });

    });
};