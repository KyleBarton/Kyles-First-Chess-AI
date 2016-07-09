//this is the games controller
var gameProto = require('../Models/game');
var gameRepository = require('../DataAccess/gameRepository');

var gamesController = {
	newGame : function(callBack){
		gameProto.newGame(gameRepository.saveNew, function(err, game){
			if (err){
				throw "aaah";
			}
			callBack(null, game);
		});
	},
	get : function(gameId, callBack){
		gameRepository.getGame(gameId, function(err, data){
			var game = gameProto.init(data);
			callBack(null, game.getModel());
		})
	},
	makeMove : function(gameId, move, callBack){
		gameRepository.getGame(gameId, function(err, data){
			var game = gameProto.init(data);
			game.makeMove(move);
			gameRepository.save(game.getModel(), function(err, data){
				callBack(null, game.getModel());
			});
		})
	}, 
	getMoves: function(gameId, callBack){
		gameRepository.getGame(gameId, function(err, data){
			var game = gameProto.init(data);
			callBack(null, game.getMoves());
		});
	}
}


module.exports = gamesController;