module.exports = function (app) {
    var Examen = require('./examen.controller');
    
    app.route('/v0/examen').post(Examen.create);
    app.route('/v0/examen').get(Examen.retrieve);
    app.route('/v0/examen/:id').get(Examen.detail);
    app.route('/v0/calificaciones/:id').get(Examen.calificaciones);
    app.route('/v0/calificaciones_excel/:id').get(Examen.calificaciones_excel);
    app.route('/v0/examen/:id').patch(Examen.update);
    app.route('/v0/examen/:id').put(Examen.replace);
    app.route('/v0/examen/:id').delete(Examen.delete);
};