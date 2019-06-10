var ObjectId = require('mongodb').ObjectID;
var collectionName = "responder_encuesta";


module.exports.create = function (db, data, callback) {
    var result = {
        success: false,
        msjError: "No disponible",
        data: {}
    }

    var examen = false;
    var prototipo = false;
    var test = false;


    if (data.tipoEncuesta.id === 3) {
        examen = true;
    }
    if (data.tipoEncuesta.id === 4 || data.tipoEncuesta.id === 10) {
        prototipo = true;
    }
    if (data.tipoEncuesta.id === 10) {
        test = true;
    }

    var insert = {
        encuesta: data.encuesta,
        preguntas: data.preguntasList,
        tipoEncuesta: data.tipoEncuesta,
        usuario: 0,
        date: new Date()
    };
    if (examen) {
        insert.attuid = data.attuid;
        insert.nombre = data.nombre;
    }
    if (test) {
        insert.attuid = data.attuid;
        insert.nombre = data.nombre;
    }
    if (prototipo) {
        insert.attuid = data.attuid;
        insert.wr = data.wr;
        insert.comentario = data.comentario || "";
    }

    db.collection(collectionName).insertOne(insert, function (err, response) {

        result.success = true;
        result.msjError = "";

        if (examen) {
            var correctas = 0;
            for (let index = 0; index < data.preguntasList.length; index++) {
                const element = data.preguntasList[index].respuesta;
                console.log(element);
                if (element.id == 0) {
                    correctas++
                }
            }

            result.data = { "calificacion": ((correctas / data.preguntasList.length) * 100).toFixed(2) };
        }

        callback(err, result, 200);
    });

};

module.exports.retrieve = function (db, callback) {
    var result = [];
    var cursor = db.collection(collectionName).find({});
    cursor.each(function (err, doc) {
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

module.exports.detail = function (db, id, callback) {
    var result = [];
    var cursor = db.collection(collectionName).find({ _id: ObjectId(id) });
    cursor.each(function (err, doc) {
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

module.exports.update = function (db, id, data, callback) {
    db.collection(collectionName).updateOne(
        { _id: ObjectId(id) },
        {
            $set: data,
            $currentDate: { "lastModified": true }
        }, function (err, results) {
            callback(err, data, 200);
        }
    );
};

module.exports.replace = function (db, id, data, callback) {
    db.collection(collectionName).replaceOne(
        { _id: ObjectId(id) },
        data
        , function (err, results) {
            data.id = id;
            callback(err, data, 200);
        }
    );
};

module.exports.delete = function (db, id, callback) {

    module.exports.detail(db, id, function (result) {
        db.collection(collectionName).deleteMany(
            { _id: ObjectId(id) },
            function (err, results) {
                callback(err, results, 200);
            }
        );
    });

};

module.exports.indicadores = function (db, encuesta, callback) {
    var cursor = db.collection(collectionName).find(
        {
            "encuesta.id": Number(encuesta.id)
        }
    );
    encuesta.graficas = [];
    encuesta.respondida = 0;
    for (var i in encuesta.preguntas[0].respuestas) {
        var respuesta = encuesta.preguntas[0].respuestas[i];
        encuesta.graficas[i] = {};
        encuesta.graficas[i].name = encuesta.tipoEncuesta.id === 1 || encuesta.tipoEncuesta.id === 4 ? respuesta.name : respuesta.categoria;
        encuesta.graficas[i].porcentaje = 0;
        encuesta.graficas[i].id = respuesta.id;
    }

    // new
    for (var i in encuesta.preguntas) {
        var pregunta = encuesta.preguntas[i];
        for (var j in pregunta.respuestas) {
            var respuesta = pregunta.respuestas[j];
            respuesta.porcentaje = 0;
        }
    }

    cursor.each(function (err, doc) {
        if (doc != null) {
            doc.id = doc._id;
            delete doc._id;
            delete doc.date;


            // new
            for (var i in doc.preguntas) {
                var preguntaRespondida = doc.preguntas[i];
                var pregunta = encuesta.preguntas[i];

                var respuestaName = preguntaRespondida.respuesta.name = encuesta.tipoEncuesta.id === 1 || encuesta.tipoEncuesta.id === 4 ? preguntaRespondida.respuesta.name : preguntaRespondida.respuesta.categoria;
                for (var j in pregunta.respuestas) {
                    var respuesta = pregunta.respuestas[j];
                    var respuestaNameTemp = encuesta.tipoEncuesta.id === 1 || encuesta.tipoEncuesta.id === 4? respuesta.name : respuesta.categoria;

                    if (preguntaRespondida.respuesta.id === respuesta.id) {
                        respuesta.porcentaje++;
                    }


                }

            }

            for (var i in doc.preguntas) {
                var pregunta = doc.preguntas[i];

                for (var j in encuesta.graficas) {
                    var categoria = encuesta.graficas[j];
                    //if (encuesta.tipoEncuesta.id === 1) {
                        if (categoria.id === pregunta.respuesta.id) {
                            categoria.porcentaje++;
                        }
                   /* } else {
                        if (categoria.name === pregunta.respuesta.categoria) {
                            categoria.porcentaje++;
                        }
                    }*/
                }
            }
            encuesta.respondida++;
        } else {
            for (var j in encuesta.graficas) {
                var categoria = encuesta.graficas[j];
                categoria.porcentaje = ((categoria.porcentaje / (encuesta.respondida * encuesta.preguntas.length)) * 100) || 0;
                categoria.porcentaje = Math.round(categoria.porcentaje);
            }

            // new
            for (var i in encuesta.preguntas) {
                var pregunta = encuesta.preguntas[i];
                for (var j in pregunta.respuestas) {
                    var respuesta = pregunta.respuestas[j];
                    var porcentaje = respuesta.porcentaje;
                    respuesta.porcentaje = (porcentaje / encuesta.respondida) * 100;
                    respuesta.porcentaje = Math.round(respuesta.porcentaje);
                }
            }
            callback(encuesta);
        }
    });
};

module.exports.validar_examen = function (db, idencuesta, attuid, callback) {
    var result = {
        success: false,
        msjError: "Este attuid: "+ attuid +" ya respondió el examen anteriormente",
        data: {}
    }
    db.collection("responder_encuesta").findOne({ "encuesta.id": Number(idencuesta), "attuid": attuid }, { fields: { _id: 1 } }).then(function (doc) {

        if (!(doc != null)) {
            result.success = true;
        }
        callback(200, result);
    });


}



module.exports.detail_indicadores = function (db, id, callback) {
    db.collection('encuestas').findOne({ id: Number(id) }, { fields: { _id: 0 } }).then(function (doc) {
      var result = {
        success: false,
        msjError: "No disponible",
        data: {}
      }
      var code = 201;
      if (doc != null) {
          result.success = true;
          result.msjError = "";
          result.data = doc;
          code = 200;
      }
      callback(result, code);
    });
  };

  module.exports.validar_examensolo = function (db, idencuesta, attuid, callback) {
    var result = {
        success: false,
        msjError: "Este attuid: "+ attuid +" ya respondió el examen anteriormente",
        data: {}
    }
    db.collection("responder_encuesta").findOne({ "encuesta.id": Number(idencuesta), "attuid": attuid }, { fields: { _id: 1 } }).then(function (doc) {

        if (doc == null) {
            result.success = true;
            result.msjError="";
        }
        callback(200, result);
    });
}