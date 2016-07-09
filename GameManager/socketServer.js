var express = require('express');
var app = express();
var http = require('http');
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

app.use(express.static('../TestClient'));

var createNewGame = function(callBack){
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
}

var getGame = function(gameId, callBack){
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

}

var makeMove = function(gameId, move, callBack){
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

io.on('connection', function(socket){
	
	console.log('a user connected');
	
	socket.on('new game', function(data){
		createNewGame(function(game){
			socket.emit('created game', game)
		})
	});

	socket.on('random move', function(gameId){
		getGame(gameId, function(game){
			makeMove(gameId, game.moves[0], function(game){
				socket.emit('updated game', game);
			});
		});
	})
	
	socket.on('disconnect', function(){
		console.log('a user disconnected');
	})
});

httpServer.listen("3002", function(){
	console.log("Listening on port 3002");
});