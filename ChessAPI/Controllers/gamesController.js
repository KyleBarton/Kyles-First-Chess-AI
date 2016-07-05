//this is the games controller

var gamesController = {
	newGame : function(callBack){
		callBack(null, 'You started a new game in the games controller!');
	},
	get : function(gameId, callBack){
		callBack(null, 'You got a game with id ' + gameId + ' in the games controller!');
	},
	makeMove : function(gameId, callBack){
		callBack(null, 'You\'re editing a game with id ' + gameId + ' in the games controller!');
	}
}


module.exports = gamesController;