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


app.controller('SettingsCtrl', function($scope, AuthService, $state) {

	$scope.logout = function() {
		AuthService.logout().then();
		$state.go('front-page');
	};

})

