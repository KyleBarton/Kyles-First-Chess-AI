var brainApp = angular.module("brainApp", []);



brainApp.controller('chessController', function($scope, $http){
	//todo: we need to break this out into a service
	$scope.nextMove = function(){
		$http.get('/nextMove?game=' + $scope.gameFen).success(function(data){
			$scope.gameFen = data;
				var board1 = new ChessBoard('board1', $scope.gameFen);
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


});