module.exports = function (app) {
    var ResponderEncuesta = require('./responder_encuesta.controller');
    
    app.route('/v0/responder-encuesta').post(ResponderEncuesta.create);
    app.route('/v0/responder-encuesta').get(ResponderEncuesta.retrieve);
    app.route('/v0/responder-encuesta/:id').get(ResponderEncuesta.detail);
    app.route('/v0/responder-encuesta/:id').patch(ResponderEncuesta.update);
    app.route('/v0/responder-encuesta/:id').put(ResponderEncuesta.replace);
    app.route('/v0/responder-encuesta/:id').delete(ResponderEncuesta.delete);

    app.route('/v0/indicadores/:id').get(ResponderEncuesta.indicadores);
};