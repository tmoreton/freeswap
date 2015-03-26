app.config(function($stateProvider) {
  $stateProvider.state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "js/settings/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })
})


app.controller('SettingsCtrl', function($scope, AuthService, $state, user) {

	$scope.logout = function() {
		user.logout();
    console.log(AuthService.isAuthenticated());
    $state.go('front-page')
	};

})

