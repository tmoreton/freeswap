app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('front-page', {
    url: "/front-page",
    templateUrl: "/js/front-page/front-page.html",
    controller: 'FrontPageCtrl'
  })
});

app.controller('FrontPageCtrl', function($scope, $window, $location, $state, user) {

  $scope.signUp = function(newUser) {
    user.createUser(newUser).then(function() {
      $state.go('app.swap');
    });
  }

  // Login not working... get this fixed
  $scope.login = function(credentials) {
    user.login(credentials).then(function(user) {
      console.log('Logged in user',user);
      // $state.go('app.swap'); // Make this route only work if login is validated...
    })
  };
})
