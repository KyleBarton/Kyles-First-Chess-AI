var brainApp = angular.module("brainApp", []);


//TODO: nextMove should be a put? Maybe not, because it's not itempotent
brainApp.controller('chessController', function($scope, $http){
	//todo: we need to break this out into a service
	$scope.nextMove = function(){
		$http.get('/nextMove?game=' + $scope.gameFen).success(function(data){
			$scope.gameFen = data;
			board1 = new ChessBoard('board1', $scope.gameFen);
		}).error(function(err){
			$scope.errorMessage = "Could not get next game";
		});
	};

	$scope.newGame = function(){
		$http.get('/newGame').success(function(data){
			$scope.gameFen = data;
		}).error(function(err){
			$scope.errorMessage = 'could not find endpoint';
		});
	}

	$scope.simRestOfGame = function(){
		var gameOver = false;
		setInterval(function(){
			console.log('chess board going in: ' + $scope.gameFen);
			board1 = new ChessBoard('board1', $scope.gameFen);
			console.log('hi there!');
			$http.get('/nextMove?game=' + $scope.gameFen).then(function(data){
				if (data === 'GameOver'){
					console.log('i"m here');
					gameOver = true;
				}
				else if ($scope.gameFen === data){
					console.log('No I"m here');
					gameOver = true;
				}
				else{
					$scope.gameFen = data.data;
					// $scope.setBoard();
				}
			}, function(error){
				$scope.errorMessage = "Simulation Error: " + error;
			});

			if (gameOver){
				clearInterval();
			}
		}, 3000);
	}

	// $scope.setBoard = function(){
	// 	console.log($scope.gameFen);
	// }
});







