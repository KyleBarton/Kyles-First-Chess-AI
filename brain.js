//This is where the actual AI will be done

var util = require('util')
var chess = require('./ChessLogic/chess')

function simRandomGame(){
	var game = new chess.Chess();
	while(!game.game_over()){
		game.move(nextMove(game));
		console.log(game.ascii());
		// console.log("Position\n " + game.ascii() + '\n');
		// var moves = game.moves();
		// var move = moves[Math.floor(Math.random() * moves.length)]
		// game.move(move);
		// console.log("move: " + move + '\n');
		// //console.readLine();
	}
}

function nextMove(game){
	var moves = game.moves();

	var move = moves[Math.floor(Math.random() * moves.length)];

	return move;
}

var bigGame = new chess.Chess();

function initGame(){
	return new chess.Chess();
}

function moveNext(){
	bigGame.move(nextMove(bigGame));
	return bigGame.ascii();
}

//Ok, let's treat this like a server for now.