app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('front-page', {
    url: "/front-page",
    templateUrl: "/js/front-page/front-page.html",
    controller: 'FrontPageCtrl'
  })
});

app.controller('FrontPageCtrl', function($scope, AuthService, Session, AUTH_EVENTS, $rootScope, $window, $location, $http, $state) {
  $scope.signUp = function(newUser) {

  	$rootScope.$on('$stateChangeStart', function(event, toState) {
  	  if (!$rootScope.isAuthenticated) {
  	      event.preventDefault();
  	      $state.go('front-page');
  	  }
  	})

  	console.log($rootScope.isAuthenticated);

    console.log(newUser);
    $http.post('api/users', newUser).then(function(data) {
      AuthService.login(newUser).then(function() {
        $rootScope.isAuthenticated = AuthService.isAuthenticated();
        console.log($rootScope.isAuthenticated);
        $state.go('app.swap');
      });
    });
  };
})
