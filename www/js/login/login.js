app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: "/js/login/login.html",
    controller: 'loginCtrl',
    authenticate: false
  })
  .state('sign-up', {
    url: '/signup',
    templateUrl: "/js/login/sign-up.html",
    controller: 'loginCtrl',
    authenticate: false
  })  
});

app.controller('loginCtrl', function($scope, $window, $location, $state, user) {
  $scope.signUp = function(newUser) {
    user.createUser(newUser).then(function(response) {
      $scope.newUser = {};
      $state.go('app.swap');
    });
  };

  $scope.loginPlatform = function(platform) {
    user.loginSocial(platform);
    $state.go('app.swap');
  }

  $scope.goTo = function(page) {
    $state.go(page);
  }

  $scope.login = function(credentials) {
    user.login(credentials).then(function(user) {
      if (user) {
        $scope.user = {};
        $state.go('app.swap');
      }
    })
  };
})
