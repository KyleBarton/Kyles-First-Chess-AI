//this is the games controller

var gamesController = {
	newGame : function(){
		return 'You started a new game in the games controller!';
	},
	getGame : function(gameId){
		return 'You got a game with id ' + gameId + ' in the games controller!';
	},
	makeMove : function(gameId){
		return 'You\'re editing a game with id ' + gameId + ' in the games controller!';
	}
}


module.exports = gamesController;