var ObjectId = require('mongodb').ObjectID;
var autoIncrement = require("mongodb-autoincrement");

module.exports.create = function (db, data, callback) {
  //var valid = Util.validateModel(data, { required:['key'], number:['key'], string:['name','description'] });
  var valid = true;
  var collectionName = "encuestas";
  if (valid) {

    autoIncrement.getNextSequence(db, collectionName, function (err, autoIndex) {

      var direccionObj = { id: data.direccion.id, name: data.direccion.name };
      var tipoEncuestaObj = { id: data.tipoEncuesta.id, name: data.tipoEncuesta.name };
      var preguntasList = [];
      data.preguntas = data.preguntas || [];
      for (var i in data.preguntas) {
        var pregunta = {};
        pregunta.pregunta = data.preguntas[i].pregunta;
        pregunta.respuestas = data.preguntas[i].respuestas || [];
        preguntasList.push(pregunta);
      }

      switch (tipoEncuestaObj.id) {
        case 3:
          db.collection(collectionName).insertOne({
            id: autoIndex,
            titulo: data.titulo,
            descripcion: data.descripcion,
            direccion: direccionObj,
            valides: new Date(data.valides),
            tiempo: data.tiempo,
            tipoEncuesta: tipoEncuestaObj,
            preguntas: preguntasList,
            autor: data.autor,
            usuario: 0,
            date: new Date(),
            attuid: data.attuid
          }, function (err, result) {
            // result.ops[0].id = result.ops[0]._id;
            delete result.ops[0]._id;
            delete result.ops[0].date;
            callback(err, result.ops[0], 200);
          });
          break;

        default:
          db.collection(collectionName).insertOne({
            id: autoIndex,
            titulo: data.titulo,
            descripcion: data.descripcion,
            direccion: direccionObj,
            valides: new Date(data.valides),
            tiempo: data.tiempo,
            tipoEncuesta: tipoEncuestaObj,
            preguntas: preguntasList,
            autor: data.autor,
            usuario: 0,
            date: new Date()
          }, function (err, result) {
            // result.ops[0].id = result.ops[0]._id;
            delete result.ops[0]._id;
            delete result.ops[0].date;
            callback(err, result.ops[0], 200);
          });
          break;
      }

    });
  } else {
    callback(null, 'Invalid Model', 201);
  }
};

module.exports.retrieve = function (db, callback) {
  var result = [];

  var respondida = function (result) {
    var r = 0;

    var getById = function (id, i) {
      var cursorTemp = db.collection("responder_encuesta").find({ "encuesta.id": Number(id) });

      cursorTemp.each(function (err, doc) {

        if (doc != null) {
          result[i].respondida++;
        } else {

          if (result.length === (i + 1)) {
            callback(result);
          } else {
            i++;
            getById(result[i].id, i);
          }

        }
      });
    };
    getById(result[0].id, 0);
  };

  var row = function (doc) {
    if (doc != null) {
      // doc.id = doc._id;
      delete doc._id;
      doc.respondida = 0;
      doc.valides = new Date(doc.valides);
      doc.date = new Date(doc.date);
      result.push(doc);
    } else {
      if (result.length) {
        respondida(result);
      } else {
        callback(result);
      }
    }
  };

  var cursor = db.collection('encuestas').find({});
  cursor.each(function (err, doc) {
    row(doc);
  });
};

module.exports.detail = function (db, id, callback) {
  var result = {};
  db.collection("responder_encuesta").find({ "encuesta.id": Number(id) }).project({ _id: 1 }).count().then((n) => {
    var code = 201;
    db.collection('encuestas').find({ id: Number(id) }).each(function (err, doc) {
      if (doc != null) {
        result = doc;
        delete result._id;
        result.valides = new Date(result.valides);
        result.date = new Date(result.date);
        result.respondida = n;
        code = 200;
      } else {
        callback(result, code);
      }
    });
  });
};

module.exports.update = function (db, id, data, callback) {
  db.collection('encuestas').updateOne(
    { id: Number(id) },
    {
      $set: data,
      $currentDate: { "lastModified": true }
    }, function (err, results) {
      callback(err, data, 200);
    }
  );
};

module.exports.replace = function (db, id, data, callback) {
  db.collection('encuestas').replaceOne(
    { id: Number(id) },
    data
    , function (err, results) {
      data.id = id;
      callback(err, data, 200);
    }
  );
};

module.exports.delete = function (db, id, callback) {

  module.exports.detail(db, id, function (result) {
    db.collection('encuestas').deleteMany(
      { id: Number(id) },
      function (err, results) {
        callback(err, results, 200);
      }
    );
  });

};

module.exports.calificaciones = function (db, id, callback) {
  var result = [];
  var cursor = db.collection("responder_encuesta").aggregate
    (
    [
      {
        "$match":
          {
            "encuesta.id": Number(id)
          }
      },
      {
        "$project":
          {
            _id: 0, id_examen: "$encuesta.id", attuid: "$attuid", nombre: "$nombre", examen: "$encuesta.titulo", calificacion: "$preguntas"
          }
      }
    ]
    );
  cursor.each(function (err, doc) {
    if (doc != null) {
      var correctas = 0;
      for (let index = 0; index < doc.calificacion.length; index++) {
        const element = doc.calificacion[index].respuesta;
        if (element.id == 0) {
          correctas++
        }
      }
      doc.calificacion = ((correctas / doc.calificacion.length) * 100).toFixed(2);
      result.push(doc);
    }
    else {
      cursor.close();
      callback(result, 200);
    }
  });

};

module.exports.responder_examen = function (db, body, callback) {

  var result = {};
  var code = 201;
  var cursor = db.collection("encuestas").aggregate
    (
    [
      {
        "$match":
          {
            "id": Number(body.id)
          }
      },
      {
        "$project":
          {
            _id: 0, idEncuesta: "$id", preguntas: 1
          }
      }
    ]
    );

  cursor.each(function (err, doc) {
    if (doc != null) {
      for (let pregsindex = 0; pregsindex < doc.preguntas.length; pregsindex++) {
        var respuestacorrecta;
        for (let pregindex = 0; pregindex < doc.preguntas[pregsindex].respuestas.length; pregindex++) {
          doc.preguntas[pregsindex].respuestas[pregindex].selected = false;
          doc.preguntas[pregsindex].respuestas[pregindex].select = false;
          if (doc.preguntas[pregsindex].respuestas[pregindex].id == 0) {
            doc.preguntas[pregsindex].respuestas[pregindex].select = true;
            respuestacorrecta = doc.preguntas[pregsindex].respuestas[pregindex];
          }
        }
        doc.preguntas[pregsindex].respuesta = respuestacorrecta;
      }
      doc.attuid = body.attuid;
      doc.nombre = body.nombre;
      code = 200;
      result = doc;
    }
    else {
      cursor.close();
      callback(result, code);
    }
  });

};