app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('front-page', {
    url: '/front-page',
    templateUrl: "/js/front-page/front-page.html",
    controller: 'FrontPageCtrl'
  })
});

app.controller('FrontPageCtrl', function($scope, $window, $location, $state, user) {

  $scope.signUp = function(newUser) {
    user.createUser(newUser);
    $scope.newUser = {};
  };

  $scope.loginPlatform = function(platform) {
    user.loginSocial(platform);
  }

  // Login not working... get this fixed
  $scope.login = function(credentials) {
    user.login(credentials).then(function(user) {
      if (user) {
        console.log('Logged in user',user);
        $scope.user = {};
        $state.go('app.swap');
      }
    })
  };
})
