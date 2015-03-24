app.controller('MainCtrl', function($scope,AuthService, Session, AUTH_EVENTS,$rootScope,$window,$location,$http,$state) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.isAuthenticated = AuthService.isAuthenticated();

})
