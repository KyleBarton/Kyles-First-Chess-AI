//This is where the actual AI will be done

var util = require('util')
var chess = require('./ChessLogic/chess')

function simRandomGame(){
	var game = new chess.Chess();
	while(!game.game_over()){
		console.log("Position\n " + game.ascii() + '\n');
		var moves = game.moves();
		var move = moves[Math.floor(Math.random() * moves.length)]
		game.move(move);
		console.log("move: " + move + '\n');
		console.readLine();
	}
}


simRandomGame();
