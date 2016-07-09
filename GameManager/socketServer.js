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
	}
	var request = http.request(options, function(response){
		response.setEncoding('utf8');
		response.on('data', callBack);
	});
	request.write("");
	request.end();
}

io.on('connection', function(socket){
	
	console.log('a user connected');
	
	socket.on('new game', function(data){
		createNewGame(function(game){
			socket.emit('created game', JSON.parse(game))
		})
		// socket.emit('created game', {
		// 	"fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
		// 	"id": "57815edcb23dd6ce3e495050",
		// 	"gameOver": false
		// });
	});
	
	socket.on('disconnect', function(){
		console.log('a user disconnected');
	})
});

httpServer.listen("3002", function(){
	console.log("Listening on port 3002");
});