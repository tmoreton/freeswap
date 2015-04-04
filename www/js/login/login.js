app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: "/js/login/login.html",
    controller: 'loginCtrl'
  })
  .state('sign-up', {
    url: '/login/signup',
    templateUrl: "/js/login/sign-up.html",
    controller: 'loginCtrl'
  })
});

app.controller('loginCtrl', function($scope, $window, $location, $state, user) {

  $scope.signUp = function(newUser) {
    user.createUser(newUser);
    $scope.newUser = {};
  };

  $scope.loginPlatform = function(platform) {
    user.loginSocial(platform);
  }

  $scope.goTo = function(page) {
    $state.go(page);
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
