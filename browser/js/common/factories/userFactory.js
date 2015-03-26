app.factory('user', function(AuthService) {
	return {
		info: function() {
			return AuthService.getLoggedInUser().then(function(user) {
			  return user;
			});
		}
	}
})