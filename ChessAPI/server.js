//middleware
var bodyParser = require('body-parser');
var express = require('express');

//chessAPI Dependencies
var gamesController = require('./Controllers/gamesController');


var app = express();
app.use(bodyParser.json());



var gamesEndpoint = "/games";

app.post(gamesEndpoint, function(req, res){

	res.send(gamesController.newGame());
});

app.route(gamesEndpoint+"/:gameId")

.get(function(req, res){
	res.send('you got a game of id ' + req.params.gameId);
})
.put(function(req, res){
	res.send("you're changing a game of id " + req.params.gameId);
});

app.listen(3001);

console.log('Listening on port 3001');