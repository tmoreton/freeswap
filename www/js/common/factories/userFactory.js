app.factory('user', function(AuthService, $http) {
	return {
		info: function() {
			return AuthService.getLoggedInUser().then(function(user) {
			  return user;
			});
		},
		createUser: function(newUser) {
			return $http.post("https://freeswap.herokuapp.com/#/api/users", newUser).then(function(data) {
	      return AuthService.login(newUser).then()
	    });
		},
		login: function(credentials) { // Fix this... It is not obtaining our users from database
			return AuthService.login(credentials).then(function(user) {
				return user;
	    }).catch(function() {
	    	alert('Try again')
	    })
		},
		logout: function() {
			return AuthService.logout();
		}
	}
})
