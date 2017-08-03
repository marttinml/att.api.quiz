module.exports = function (app) {
    var Direccion = require('./tipo_encuesta.controller');
    
    app.route('/v0/tipo-encuesta').post(Direccion.create);
    app.route('/v0/tipo-encuesta').get(Direccion.retrieve);
    app.route('/v0/tipo-encuesta/:id').get(Direccion.detail);
    app.route('/v0/tipo-encuesta/:id').patch(Direccion.update);
    app.route('/v0/tipo-encuesta/:id').put(Direccion.replace);
    app.route('/v0/tipo-encuesta/:id').delete(Direccion.delete);
};