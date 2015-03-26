app.factory('user', function(AuthService) {
	return {
		info: function() {
			return AuthService.getLoggedInUser().then(function(user) {
			  return user;
			});
		},
		createUser: function(newUser) {
			return $http.post('api/users', newUser).then(function(data) {
	      return AuthService.login(newUser).then(function() {
	        $state.go('app.swap');
	      });
    });
		}
	}
})