//this is the games controller
var gameProto = require('../Models/game');

var gamesController = {
	newGame : function(callBack){
		var newGame = gameProto.newGame();
		callBack(null, newGame.getModel());
	},
	get : function(gameId, callBack){
		var game = gameProto.init(gameRepository.getData(gameId));
		callBack(null, game.getModel());
	},
	makeMove : function(gameId, callBack){
		callBack(null, 'You\'re editing a game with id ' + gameId + ' in the games controller!');
	}
}


module.exports = gamesController;