var brainApp = angular.module("brainApp", []);



brainApp.controller('chessController', function($scope, $http){

	$http.get('/newGame').success(function(data){
		$scope.gameFen = data;
	}).error(function(err){
		$scope.gameFen = 'could not find endpoint';
	});

	$http.get('/ascii?game=' + $scope.gameFen).success(function(data){
		$scope.gameAscii = data;
	}).error(function(err){
		$scope.gameAscii = "Ascii failed to load";
	});
	
	$scope.nextMove = function(){
		$http.get('/nextMove?game=' + $scope.gameFen).success(function(data){
			$scope.gameFen = data;
			$http.get('/ascii?game=' + $scope.gameFen).success(function(data){
				$scope.gameAscii = data;
			}).error(function(err){
				$scope.gameAscii = "Ascii failed to load";
			});
		}).error(function(err){
			$scope.gameFen = "Could not get next game";
		});
	};
});