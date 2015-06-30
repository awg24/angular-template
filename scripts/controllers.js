angular.module('assignment.controllers', ['assignment.services'])
.controller('loadingButton', function($scope, $timeout ,$rootScope) {
	var count = 0;
	$scope.innerText = "Submit";

	$scope.buttonLikes = count+" likes";

	$scope.buttonClicked = function(){
		$scope.innerText = "Loading";
		$timeout(function(){
			$scope.innerText = "Submit";
		}, 4000)
	}

	$scope.liked = function(){
		count++;
		if(count === 1){
			$scope.buttonLikes = count + " like";
		} else {
			$scope.buttonLikes = count + " likes";
		}
	}
})
.controller('greetings', function($scope, $rootScope) {
	$scope.name = '';
	$scope.logClick = function(){
		$scope.$watch('name', function() {
			if($scope.name.toLowerCase() === 'allen') {
				$scope.greeting = "There\'s not a shred of evidence in favor of the idea that life is serious.";
			} else if($scope.name.toLowerCase() === 'bart') {
				$scope.greeting = "Dont have a cow man!";
			}
		});
	}
})
.controller('loginForm', function($scope, $window, $http ,$rootScope) {
	$scope.error = "";
	$scope.goLogin = function(){

		if(!$scope.username || !$scope.password){
			$scope.error = "Fields must not be blank!"
		} else {
			$http.get("https://tiny-pizza-server.herokuapp.com/collections/awg-login/")
				.success(function(data){

					var foundUsername = data.filter(function(obj){
						if(obj.username === $scope.username){
							return obj;
						} 
					});

					console.log("found username: ", foundUsername);
					if(!foundUsername.length){
						$scope.error = "Username doesn't exist!"
					} else if(foundUsername[0].password !== $scope.password){
						$scope.error = "Password doesn't match!"
					} else {
						$window.location.href = "https://www.xkcd.com";
					}
				})
				.error(function(){
					$scope.error = "Something went terribly wrong!"
				});
			
		}
		
	}
});