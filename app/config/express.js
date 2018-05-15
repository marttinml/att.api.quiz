/*jslint node:true*/
var express         = require("express"),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    json2xls = require('json2xls');
    app             = express();

module.exports = function(){

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    var VERSIONS = {'Pre-Production': '/v0/'};
    app.get('/', function(req, res) {
        res.json(VERSIONS);
    });
    

    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(json2xls.middleware);
    
    for (i in VERSIONS) {
        require('../api' + VERSIONS[i] + 'test/test.router')(app);
        require('../api' + VERSIONS[i] + 'encuesta/encuesta.router')(app);
        require('../api' + VERSIONS[i] + 'direccion/direccion.router')(app);
        require('../api' + VERSIONS[i] + 'tipo_encuesta/tipo_encuesta.router')(app);
        require('../api' + VERSIONS[i] + 'satisfaccion/satisfaccion.router')(app);
        require('../api' + VERSIONS[i] + 'responder_encuesta/responder_encuesta.router')(app);
        require('../api' + VERSIONS[i] + 'examen/examen.router')(app);
    }

    return app;
};








