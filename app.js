//This is the controller I guess?

angular.module("brainApp", [])
	.controller("chessController", function($scope, $http){
		$http.get('/game').success(function(data){
			$scope.currentBoard = data;
		}).fail(function(data){
			$scope.currentBoard = 'Nope!';
		})
	})