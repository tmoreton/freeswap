app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('front-page', {
    url: '/front-page',
    templateUrl: "/js/front-page/front-page.html",
    controller: 'FrontPageCtrl'
  })
  .state('sign-up', {
    url: '/front-page/signup',
    templateUrl: "/js/front-page/sign-up.html",
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
