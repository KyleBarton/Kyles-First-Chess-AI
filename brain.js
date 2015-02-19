//This is where the actual AI will be done

var util = require('util')
var chess = require('./ChessLogic/chess')

var express = require('express');

var app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res){
	res.send("didn't get there dude");
})


app.get('/newGame', function(req, res){
	var game = chess.Chess();
	var file = game.fen();
	res.send(file);
});

app.get('/a2', function(req, res){
	var game = chess.Chess();
	res.send(game.get('a2'));
})

app.get('/nextMove', function(req, res){
	var game = chess.Chess();
	game.load(req.query.game);
	game.move(nextMove(game));
	res.send(game.fen());
})

app.get('/ascii', function(req, res){
	var game = chess.Chess();
	game.load(req.query.game);
	res.send(game.ascii());
})

app.listen(3000);

console.log('Listening on port 3000');




// function simRandomGame(){
// 	var game = new chess.Chess();
// 	while(!game.game_over()){
// 		game.move(nextMove(game));
// 		console.log(game.ascii());
// 		// console.log("Position\n " + game.ascii() + '\n');
// 		// var moves = game.moves();
// 		// var move = moves[Math.floor(Math.random() * moves.length)]
// 		// game.move(move);
// 		// console.log("move: " + move + '\n');
// 		// //console.readLine();
// 	}
// }

function nextMove(game){
	var moves = game.moves();

	var move = moves[Math.floor(Math.random() * moves.length)];

	return move;
}

// var bigGame = new chess.Chess();

// function initGame(){
// 	return new chess.Chess();
// }

// function moveNext(){
// 	bigGame.move(nextMove(bigGame));
// 	return bigGame.ascii();
// }

//Ok, let's treat this like a server for now.


