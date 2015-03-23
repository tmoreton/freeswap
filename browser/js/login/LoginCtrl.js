app.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('js/login/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.loginFacebook = function() {
    $window.location.href = '/auth/facebook';
    console("1. this is working")
  }

  $scope.showSignup = function() {
    console.log("this is working")
    $state.go("signup")
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

// app.config(function($stateProvider, $urlRouterProvider) {
//   // $stateProvider

//   // .state('login', {
//   //   url: "/login",
//   //   abstract: true,
//   //   templateUrl: "login.html",
//   //   controller: 'LoginCtrl'
//   // })

//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/app/chat');
// });
