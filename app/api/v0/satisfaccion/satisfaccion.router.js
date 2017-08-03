module.exports = function (app) {
    var Satisfaccion = require('./satisfaccion.controller');
    
    app.route('/v0/satisfaccion').post(Satisfaccion.create);
    app.route('/v0/satisfaccion').get(Satisfaccion.retrieve);
    app.route('/v0/satisfaccion/:id').get(Satisfaccion.detail);
    app.route('/v0/satisfaccion/:id').patch(Satisfaccion.update);
    app.route('/v0/satisfaccion/:id').put(Satisfaccion.replace);
    app.route('/v0/satisfaccion/:id').delete(Satisfaccion.delete);
};