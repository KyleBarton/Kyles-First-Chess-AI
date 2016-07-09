var http = require('http');

var gameManager = {
	createNewGame: function(callBack){
		var options = {
			"host": "localhost",
			"port": "3001",
			"path": "/games",
			"method": "POST"
		};
		var request = http.request(options, function(response){
			response.setEncoding('utf8');
			response.on('data', function(data){
				callBack(JSON.parse(data));
			});
		});
		request.write("");
		request.end();
	},
	getGame: function(gameId, callBack){
		var options = {
			"host": "localhost",
			"port": "3001",
			"path": "/games/" + gameId,
			"method": "GET"
			};
		var request = http.request(options, function(response){
			response.setEncoding('utf8');
			response.on('data', function(data){
				callBack(JSON.parse(data));
			});
		});

		request.end();
	},
	makeMove: function(gameId, move, callBack){
			var options = {
			"host": "localhost",
			"port": "3001",
			"path": "/games/" + gameId + "/moves/" + move,
			"method": "PUT"
		}
		var request = http.request(options, function(response){
			response.setEncoding('utf8');
			response.on('data', function(data){
				callBack(JSON.parse(data));
			});
		});
		request.write("");
		request.end();
	}
};

module.exports = gameManager;