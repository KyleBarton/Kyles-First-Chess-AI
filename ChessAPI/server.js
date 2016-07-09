//middleware
var bodyParser = require('body-parser');
var express = require('express');

//chessAPI Dependencies
var gamesController = require('./Controllers/gamesController');


var app = express();
app.use(bodyParser.json());



var gamesEndpoint = "/games";

app.post(gamesEndpoint, function(req, res){
	gamesController.newGame(function(err, data){
		res.send(data);
	});
});

app.route(gamesEndpoint+"/:gameId")

.get(function(req, res){
	gamesController.get(req.params.gameId, function(err, data){
		res.send(data);
	});
})
.put(function(req, res){
	gamesController.makeMove(req.params.gameId, function(err, data){
		res.send(data);
	});
});

app.route(gamesEndpoint+"/:gameId/moves")

.get(function(req, res){
	gamesController.getMoves(req.params.gameId, function(err, data){
		res.send(data);
	})
})

app.listen(3001);

console.log('Listening on port 3001');