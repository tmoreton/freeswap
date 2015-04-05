app.controller('MainCtrl', function($scope,AuthService, Session, AUTH_EVENTS,$rootScope,$window,$location,$http,$state) {
  // Form data for the login modal

  $scope.isAuthenticated = AuthService.isAuthenticated();

  $scope.getLocation = function() {
    navigator.geolocation.getCurrentPosition(show_map);
    function show_map(position) {
      $scope.long = position.coords.longitude;
      $scope.lat = position.coords.latitude;
      $rootScope.coordinates = [position.coords.longitude, position.coords.latitude];
      console.log("coordinates", $rootScope.coordinates)
    }
  }
  $scope.getLocation();
})
