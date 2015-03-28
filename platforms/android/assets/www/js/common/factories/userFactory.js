app.factory('user', function(AuthService, $http, $state, $ionicPopup, $window, $location) {
	return {
		info: function() {
			return AuthService.getLoggedInUser().then(function(user) {
			  return user;
			});
		},
		createUser: function(newUser) {
<<<<<<< HEAD
			return $http.post("https://freeswap.herokuapp.com/#/api/users", newUser).then(function(data) {
	      return AuthService.login(newUser).then()
=======
			return $http.post('api/users', newUser).then(function(data) {
	      return AuthService.login(newUser).then(function(newUser) {
	      	console.log(newUser);
	      	$state.go('app.swap');
	      })
>>>>>>> master
	    });
		},
		login: function(credentials) {
			return AuthService.login(credentials).then(function(user) {
				if (user) {
					console.log(user);
					return user;
				}
				else {
					console.log(user);
				  var alertPopup = $ionicPopup.alert({
				    title: 'Access Denied',
				    template: 'Incorrect username/password. Please try again.'
				  })
				  alertPopup.then(function(response) {
				    console.log('Access Denied')
				  })
				} 
	    })
		},
		loginSocial: function(platform) {
			$window.location.href = '/auth/' + platform;
		},
		logout: function() {
			return AuthService.logout();
		}
	}
})
