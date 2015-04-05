app.config(function($stateProvider) {
  $stateProvider.state('app.settings', {
    url: "/settings",
    authenticate: true,
    views: {
      'menuContent': {
        templateUrl: "js/settings/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })
})


app.controller('SettingsCtrl', function($scope, AuthService, $state, user, $rootScope) {

	$scope.logout = function() {
		user.logout();
    $state.go('login')
	};
  $scope.getLocation = function() {
    navigator.geolocation.getCurrentPosition(show_map);
    function show_map(position) {
      $scope.long = position.coords.longitude;
      $scope.lat = position.coords.latitude;
      $rootScope.coordinates = [position.coords.longitude, position.coords.latitude];
      console.log("coordinates", $rootScope.coordinates)
    }
  }
})

