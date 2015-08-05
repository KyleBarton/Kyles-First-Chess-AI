//this will be the brain.js
var chess = require('./ChessLogic/chess');


/*current game needs to be 
a moodel that doesn't overlap
with the chess logic
stuff. Board maybe?*/
// var Game = function(){
// 	var fen;
// 	var gameId;
// }


this.getNewGame = function(){
	return chess.Chess();
}


this.makeNextMove = function(gameFen){
	var game = chess.Chess();
	game.load(gameFen);
	var moves = game.moves();
	var move = this.calculateNextMove(moves);

	game.move(move);
	return game.fen();
	//return gameFen;
}


this.getAscii = function(gameFen){
	var game = chess.Chess();
	game.load(gameFen);
	return game.ascii();
}


this.calculateNextMove = function(moves){
	return moves[Math.floor(Math.random()*moves.length)];
}