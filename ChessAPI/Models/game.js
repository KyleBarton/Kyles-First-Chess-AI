//This is the game
var newGame = require('../../ChessLogic/chess').Chess;

var game = {
	newGame: function(){
		this.fen = newGame().fen();
		this.id = '1234';
		this.gameOver = false;
		return this;
	},
	init: function(data){
		var logicalGame = newGame();
		logicalGame.load(data.fen);

		this.fen = logicalGame.fen();
		this.id = data.id;
		this.gameOver = logicalGame.game_over();
		return this;
	},
	currentBoard: function(){
		return this.fen;
	},
	getModel: function(){
		return {
			"Id":  this.id,
			"Fen": this.fen,
			"GameOver": this.gameOver
		}
	}
};

module.exports = game;
