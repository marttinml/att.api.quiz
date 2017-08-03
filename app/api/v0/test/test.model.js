var ObjectId = require('mongodb').ObjectID;

module.exports.create = function(db, data, callback) {
  //var valid = Util.validateModel(data, { required:['key'], number:['key'], string:['name','description'] });
  var valid = true;
  if(valid){
      db.collection('test').insertOne( {
          name            : data.name,
          description     : data.description,
          date            : new Date(),
      }, function(err, result){
          result.ops[0].id = result.ops[0]._id;
          delete result.ops[0]._id;
          delete result.ops[0].date;
          callback(err, result.ops[0], 200);
      } );
  }else{
    callback(null, 'Invalid Model', 201);
  }
};

module.exports.retrieve = function(db, callback) {
   var result = [];
   var cursor = db.collection('test').find({});
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result.push(doc);
      } else {
         callback(result);
      }
   });
};

module.exports.detail = function(db, id, callback) {
   var result = [];
   var cursor = db.collection('test').find({ _id : ObjectId(id) });
   cursor.each(function(err, doc) {
      if (doc != null) {
          doc.id = doc._id;
          delete doc._id;
          delete doc.date;
          result.push(doc);
      } else {
         callback(result[0]);
      }
   });
};

module.exports.update = function(db, id, data, callback) {
   db.collection('test').updateOne(
        { _id : ObjectId(id) },
        {
          $set: data,
          $currentDate: { "lastModified": true }
        },function(err, results) {
            callback(err, data, 200);
        }
    );
};

module.exports.replace = function(db, id, data, callback) {
   db.collection('test').replaceOne(
        { _id : ObjectId(id) },
        data
        ,function(err, results) {
            data.id = id;
            callback(err, data, 200);
        }
    );
};

module.exports.delete = function(db, id, callback) {
  
  module.exports.detail(db, id, function(result){
      db.collection('test').deleteMany(
        { _id : ObjectId(id) },
        function(err, results) {
            callback(err, result, 200);
        }
    );
  });
   
};