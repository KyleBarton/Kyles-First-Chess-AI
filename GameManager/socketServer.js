var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);
var gameManager = require('./gameManager');

app.use(express.static('../TestClient'));

var RECEIVE_CREATE_GAME = 'new game';
var EMIT_GAME_CREATED = 'created game';
var RECEIVE_MAKE_MOVE = 'move';
var EMIT_MOVE_MADE = 'updated game';

io.on('connection', function(socket){
	
	console.log('a user connected');
	
	socket.on(RECEIVE_CREATE_GAME, function(data){
		gameManager.createNewGame(function(game){
			socket.emit(EMIT_GAME_CREATED, game)
		})
	});

	socket.on(RECEIVE_MAKE_MOVE, function(data){
		gameManager.getGame(data.gameid, function(game){
			gameManager.makeMove(data.gameid, data.move, function(game){
				socket.emit(EMIT_MOVE_MADE, game);
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