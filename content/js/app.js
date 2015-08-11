var brainApp = angular.module("brainApp", []);


//TODO: nextMove should be a put? Maybe not, because it's not itempotent
brainApp.controller('chessController', function($scope, $http){
	//todo: we need to break this out into a service
	$scope.nextMove = function(){
		$http.get('/nextMove?game=' + $scope.gameFen).then(function(response){
			// $scope.gameFen = response.data;
			$scope.setBoardWithGameFen(response.data);
		}, function(error){
			$scope.errorMessage = 'Could not get next move';
		});
	};

	$scope.newGame = function(){
		$http.get('/newGame').then(function(response){
			// $scope.gameFen = response.data;
			$scope.setBoardWithGameFen(response.data);
		}, function(error){
			$scope.errorMessage = 'could not find endpoint /newGame';
		});
	}

	$scope.simRestOfGame = function(){
		$scope.simStopped = false;
		var gameOver = false;
		$scope.simulation = setInterval(function(){
			// console.log('hi there!');
			$http.get('/nextMove?game=' + $scope.gameFen).then(function(data){
				if (data === 'GameOver'){
					// console.log('i"m here');
					gameOver = true;
				}
				else if ($scope.gameFen === data){
					// console.log('No I"m here');
					gameOver = true;
				}
				else{
					// $scope.gameFen = data.data;
					$scope.setBoardWithGameFen(data.data);
				}
			}, function(error){
				$scope.errorMessage = "Simulation Error: " + error;
			});

		}, 250);
	}

	$scope.stopSim = function(){
		$scope.simStopped = true;
		clearInterval($scope.simulation);
	}

	$scope.setBoardWithGameFen = function(fen){
		$scope.gameFen = fen;
		board1 = new ChessBoard('board1', $scope.gameFen);
	}
});







