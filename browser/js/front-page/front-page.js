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

    console.log('User authenticated?', $rootScope.isAuthenticated);

    // Make a factory for this
    $http.post('api/users', newUser).then(function(data) {
      AuthService.login(newUser).then(function() {
        $rootScope.isAuthenticated = AuthService.isAuthenticated();
        console.log($rootScope.isAuthenticated);
        $state.go('app.swap');
      });
    });
  }
  // Make a factory for this
  $scope.login = function(credentials) {
    AuthService.login(credentials).then(function(response) {
      console.log('Logged in user',response);
      $state.go('app.swap');
    }).catch(function() {
    	alert('Try again')
    })
  };
})
