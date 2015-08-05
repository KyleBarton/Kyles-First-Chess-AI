//This is where the actual AI will be done
// var chess = require('./ChessLogic/chess');
var util = require('util');
var brain = require('./brain.js');

var express = require('express');
var app = express();

app.use(express.static('content'));

app.get('/', function(req, res){
	res.send("didn't get there dude");
})


app.get('/newGame', function(req, res){
	res.send(brain.getNewGame());
});

app.get('/a2', function(req, res){
	var game = chess.Chess();
	res.send(game.get('a2'));
})

app.get('/nextMove', function(req, res){
	res.send(brain.makeNextMove(req.query.game));
})

app.get('/ascii', function(req, res){
	res.send(brain.getAscii(req.query.game));
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

