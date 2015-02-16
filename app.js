var brainApp = angular.module("brainApp", []);



brainApp.controller('chessController', function($scope, $http){
	$http.get('/newGame').success(function(data){
		$scope.gameFen = data;
	}).error(function(err){
		$scope.gameFen = 'could not find endpoint';
	});
	// $http.get('/a2').success(function(data){
	// 	if (data.color === "b"){
	// 		$scope.squareA2 = data.type;
	// 	}
	// 	else $scope.squareA2 = data.type.toUpperCase();
	// }).error(function(err){
	// 	$scope.squareA2 = "nope";
	// });
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
			$scope.gameFen = "nope!";
		})
	}
});

// function nextMove(game){
// 	function($scope, $http){
// 		$http.get('/nextMove?game=' + $scope.gameFen).success(function(data){
// 		$scope.nextGame = data;
// 	});
// };};