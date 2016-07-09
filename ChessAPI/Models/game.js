//This is the game
var newGame = require('../../ChessLogic/chess').Chess;

var gameRepository = require('../DataAccess/gameRepository');


var game = {
	newGame: function(saveFn, callBack){
		var me = this;
		me.game = newGame();
		saveFn(me.game.fen(), function(err, id){
			me.id = id;
			callBack(null, me.getModel());	
		});
	},
	init: function(data){
		this.game = newGame();
		this.game.load(data.fen);
		this.id = data._id;
		return this;
	},
	currentBoard: function(){
		return this.fen;
	},
	getModel: function(){
		return {
			"Id":  this.id,
			"Fen": this.game.fen(),
			"GameOver": this.game.game_over()
		}
	}
};

module.exports = game;
