angular.module('basic.controllers', ['basic.services'])
.controller('BasicCtrl', function($scope, $rootScope, Test) {
	$scope.name = 'Aaron';
	$scope.myModel = Test;
});