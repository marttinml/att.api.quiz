var assert = require('assert');
	MongoClient = require('mongodb').MongoClient,
	// url         = 'mongodb://2school666:25ch001666@ds043324.mongolab.com:43324/2school',
	url 		= 'mongodb://digidev404:d1g1D3v501@ds051595.mlab.com:51595/encuestas';
	//url         = 'mongodb://localhost/encuestas';

// Test connection
module.exports.testConnection = function(callback){
	callback.starting();
    module.exports.ejecute(function(err, db) {
        assert.equal(null, err);
        callback.success();
        db.close();
	});
};

module.exports.ejecute = function (handler) {
	MongoClient.connect(url, { useNewUrlParser: true },handler);
};