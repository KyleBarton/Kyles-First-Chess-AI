//This is the controller I guess?

var brainApp = angular.module("brainApp", []);



brainApp.controller('chessController', function($scope){
	$scope.currentBoard = 5;
});
	// .controller("chessController", function($scope, $http){
	// 	$scope.currentBoard = 6;
	// 	// $http.get('/game').success(function(data){
	// 	// 	$scope.currentBoard = data;
	// 	// }).fail(function(data){
	// 	// 	$scope.currentBoard = 'Nope!';
	// 	// })
	// })