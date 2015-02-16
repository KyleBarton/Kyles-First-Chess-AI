var brainApp = angular.module("brainApp", []);



brainApp.controller('chessController', function($scope, $http){
	$http.get('/newGame').success(function(data){
		$scope.newGame = data;
	}).error(function(err){
		$scope.newGame = 'could not find endpoint';
	});
	$http.get('/a2').success(function(data){
		if (data.color === "b"){
			$scope.squareA2 = data.type;
		}
		else $scope.squareA2 = data.type.toUpperCase();
	}).error(function(err){
		$scope.squareA2 = "nope";
	});
});

// function nextMove(game){
// 	function($scope, $http){
// 		$http.get('/nextMove?game=' + $scope.newGame).success(function(data){
// 		$scope.nextGame = data;
// 	});
// };};