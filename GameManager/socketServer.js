var express = require('express');
var app = express();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);
var gameManager = require('./gameManager');

app.use(express.static('../TestClient'));

var WHITE = "white";
var BLACK = "black";

var RECEIVE_CREATE_GAME = 'new game';
var EMIT_GAME_CREATED = 'created game';
var RECEIVE_MAKE_MOVE = 'move';
var EMIT_MOVE_MADE = 'updated game';

var player1 = {
	name: null,
	playerNumber: 1,
	color: WHITE,
	myTurn: true
}

var player2 = {
	name: null,
	playerNumber: 2,
	color: BLACK,
	myTurn: false
}

var playersOnline = 0;
var readyToPlay = false;
var playersToAdd = 0;

var session = {
	players: [player1, player2],
	whitesTurn: true, //todo: let the model take care of this
	game: null,
	advanceTurn: function(){
		this.players.forEach(function(player){
			player.myTurn = !player.myTurn;
		});
		this.whitesTurn = !this.whitesTurn;
	}
};


var assignPlayer = function(userName){
	var playerToReturn = {};
	if (playersOnline == 0){
		player1.name = userName;
		playerToReturn = player1;
	}
	if (playersOnline == 1){
		player2.name = userName;
		playerToReturn = player2;
	}
	playersOnline++;
	return playerToReturn;
}

var getPlayer = function(name){
	console.log('entered name: ' + name);
	console.log('player1 name: ' + player1.name);
	console.log('player2 name: ' + player2.name);
	console.log('Whites turn' + session.whitesTurn);
	if (player1.name == name){
		return player1;
	}
	if (player2.name == name){
		return player2;
	}
}


io.on('connection', function(socket){
	console.log('Player connected');
	playersToAdd++;

	socket.on('add Player', function(playerName){
		if (playersToAdd == 0 || playersOnline > 1){
			return;
		}
		var newPlayer = assignPlayer(playerName);
		
		socket.broadcast.emit('player joined', newPlayer);
		
		playersToAdd--;

		console.log('Player ' + playerName + ' added. PlayersOnline: ' + playersOnline);

		if (playersOnline > 1){
			console.log('Starting game');
			startGame();
		}
	});

	var startGame = function(){
		gameManager.createNewGame(function(game){
			session.game = game;
			socket.broadcast.emit(EMIT_GAME_CREATED, session);
		});
	}

	socket.on(RECEIVE_MAKE_MOVE, function(playerMove){
		var player = getPlayer(playerMove.name);
		if (player.myTurn){
			gameManager.getGame(playerMove.gameid, function(game){
				gameManager.makeMove(playerMove.gameid, playerMove.move, function(game){
					console.log('Move ' + playerMove.move + ' made by ' + playerMove.name)
					session.game = game;
					session.advanceTurn();
					socket.broadcast.emit(EMIT_MOVE_MADE, session)
				});
			});
		}
	});
	
	socket.on('disconnect', function(){
		console.log('a user disconnected');
		if (playersOnline > 0){
			playersOnline--;
		}
	})
});

httpServer.listen("3002", function(){
	console.log("Listening on port 3002");
});