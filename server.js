var MongoDB = require('./app/config/mongodb'),
    express  = require('./app/config/express'),
    app      = express();


var port = process.env.PORT || 2000;
app.listen(port, function () {
    console.log("\n - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log(" |     API REST [encuestas] - http://localhost:" + port + "   | ");
    console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");

    // Conection to MongoDB
	MongoDB.testConnection({starting:function(){
			console.log("	Connecting to mongodb ···");
		},success:function(){
			console.log("	Connection to mongodb ···················· OK \n");
			console.log("	Server Started ··························· OK \n");
	        console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n\n");
		}
	});

});

