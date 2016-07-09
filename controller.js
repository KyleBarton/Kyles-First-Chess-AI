//this will be our chess controller

var chess = require('./ChessLogic/chess');
var brain = require('./brain.js');

var currentGame;

var isMyMove = function(){

}



//this is where the controller plays the game
var playGame = function(game){
	if (game){
		currentGame = game;
	}
	else {
		currentGame = chess.Chess();
	}

	while (!currentGame.game_over()){
		var nextMove = brain.getNextMove(currentGame);



	}
}


var playTurn = function(callback){
	if (!isMyMove())
	var nextMove = brain.getNextMove(currentGame);
	currentGame.move()
	callback(game);
}