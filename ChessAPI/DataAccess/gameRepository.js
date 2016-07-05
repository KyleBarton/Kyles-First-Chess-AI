//This is the game repository.
var mongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://localhost:27017/Chess';
var dbConnectError = 'Could not connect to mongo database';

var gameRepository = {
	getData: function(id, callBack){

	},
	saveNew: function(fen, callBack){
		mongoClient.connect(dbUrl, function(err, db){
			if (err){
				throw dbConnectError;
			}
			db.collection('Games').insertOne({"fen": fen}, function(err, record){
				if (err){
					throw "woops!"; //TODO: fix this
				}
				callBack(null, record.insertedId);
				db.close();
			});
		});
	}
};


module.exports = gameRepository;