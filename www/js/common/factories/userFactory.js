app.factory('user', function(AuthService, $http, $state, $ionicPopup, $window, $location) {
	return {
		info: function() {
			return AuthService.getLoggedInUser().then(function(user) {
			  return user;
			});
		},
		// history: function() {
		// 	return $http.get("/api/history", userHistory).then(function(data) {
	 //      console.log("user history", userHistory)
	 //      console.log(data)
	 //    });
		// },
		createUser: function(newUser) {
			return $http.post("/api/users", newUser).then(function(data) {
	      return AuthService.login(newUser).then(function(newUser) {
	      	console.log(newUser);
	      	$state.go('app.swap');
	      })
	    });
		},
		login: function(credentials) {
			return AuthService.login(credentials).then(
				function(user) { // Success Handler
				console.log('Logged in user',user);
				return user;
	    },
	    function(err) { // Error Handler
			  var alertPopup = $ionicPopup.alert({
			    title: 'Access Denied',
			    template: 'Incorrect username/password. Please try again.'
			  })
			  alertPopup.then(function(response) {
			    console.log('Access Denied', err)
			  })
	    })
		},

		loginSocial: function(platform) {
			$window.location.href = '/auth/' + platform;
		},
		logout: function() {
			return AuthService.logout();
		},
		getBuyerHistory: function(userId) {
			return $http.get('/api/users/' + userId + '/history');
			// .then(function(response){
			// 	return response.data;
			// })
		},
		getSellerHistory: function(userId) {
			return $http.get('/api/products/' + userId + '/history').then(function(response) {
				return response.data;
			})
		},
		findAndDelete: function (productId, userId){
			console.log("ProductId: ", productId)
			console.log("userId: ", userId)
			var reqObj = {
		        productId: productId,
		        userId: userId 
		      };
			return $http.put('/api/users/likes', reqObj).then(function(response){
				return response.data; 
			})
		}
	}
})
