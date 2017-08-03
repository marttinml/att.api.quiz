module.exports = function (app) {
    var Direccion = require('./direccion.controller');
    
    app.route('/v0/direccion').post(Direccion.create);
    app.route('/v0/direccion').get(Direccion.retrieve);
    app.route('/v0/direccion/:id').get(Direccion.detail);
    app.route('/v0/direccion/:id').patch(Direccion.update);
    app.route('/v0/direccion/:id').put(Direccion.replace);
    app.route('/v0/direccion/:id').delete(Direccion.delete);
};