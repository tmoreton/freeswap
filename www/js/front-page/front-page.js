app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('front-page', {
    url: '/front-page',
    templateUrl: "/js/front-page/front-page.html",
    controller: 'FrontPageCtrl',
    authenticate: false
  })
  .state('sign-up', {
    url: '/front-page/signup',
    templateUrl: "/js/front-page/sign-up.html",
    controller: 'FrontPageCtrl',
    authenticate: false
  })  
});

app.controller('FrontPageCtrl', function($scope, $window, $location, $state, user) {
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
