var brainApp = angular.module("brainApp", []);



brainApp.controller('chessController', function($scope, $http){
	$scope.errorMessage = "";
	
	$http.get('/newGame').success(function(data){
		$scope.gameFen = data;
	}).error(function(err){
		$scope.errorMessage = 'could not find endpoint';
	});

	// $http.get('/ascii?game=' + $scope.gameFen).success(function(data){
	// 	$scope.gameAscii = data;
	// }).error(function(err){
	// 	$scope.errorMessage = "Ascii failed to load";
	// });
	
	$scope.nextMove = function(){
		$http.get('/nextMove?game=' + $scope.gameFen).success(function(data){
			$scope.gameFen = data;
			$http.get('/ascii?game=' + $scope.gameFen).success(function(data){
				$scope.gameAscii = data;
				var board1 = new ChessBoard('board1', $scope.gameFen);
			}).error(function(err){
				$scope.errorMessage = "Ascii failed to load";
			});
		}).error(function(err){
			$scope.errorMessage = "Could not get next game";
		});
	};
});