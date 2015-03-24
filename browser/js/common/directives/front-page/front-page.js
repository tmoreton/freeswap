// app.config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider

//   .state('front-page', {
//     url: "/front-page",
//     templateUrl: "/js/common/directives/front-page/front-page.html",
//     controller: 'FrontPageCtrl'
//   })
// });

app.directive('frontPage', function(AuthService, Session, AUTH_EVENTS,$rootScope,$window,$location,$http,$state) {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/front-page/front-page.html',
		controller: 'MainCtrl',
		link: function ($scope, $element, $attr) {
			$scope.signUp = function(newUser){
				console.log(newUser);
				$http.post('api/users',newUser).then(function(data){
					AuthService.login(newUser).then(function(){
						$scope.isAuthenticated = AuthService.isAuthenticated();
						console.log($scope.isAuthenticated);
						$state.go('app.swap');
					});
				});
			};
		}
	}
})
