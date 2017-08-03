module.exports = function (app) {
    var Test = require('./test.controller');
    
    app.route('/v0/test').post(Test.create);
    app.route('/v0/test').get(Test.retrieve);
    app.route('/v0/test/:id').get(Test.detail);
    app.route('/v0/test/:id').patch(Test.update);
    app.route('/v0/test/:id').put(Test.replace);
    app.route('/v0/test/:id').delete(Test.delete);
};