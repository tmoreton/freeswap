'use strict';

app.factory('matchFactory', function($http){
	return {

		getMatchData: function(userInfo){
			var body = userInfo;
			// console.log('userinfo: ', userInfo);
			return $http.get('/api/matches/user', {params: body}).then(function(response){
				// console.log(response.data)
				return response.data;
			});
		},

		getMatchSellerData: function(userInfo){
			var body = userInfo;
			// console.log('userinfo: ', userInfo);
			return $http.get('/api/matches/seller', {params: body}).then(function(response){
				return response.data;
			});
		},

		getCraigslistData: function(userInfo){
			var body = userInfo;
			return $http.get('/api/matches/buyer/craigslist', {params: body}).then(function(response) {
				return response.data;
			});
		},

		getAppData: function(userInfo){
			var body = userInfo;
			return $http.get('/api/matches/buyer/app', {params: body}).then(function(response) {
				return response.data;
			});
		},

		// getAvailableData: function(userInfo){
		// 	var queryObj = {
		// 		toExclude: userInfo.likes.concat(userInfo.dislikes) // Combines likes and dislikes array
		// 	};
		// 	console.log('queryObj',queryObj)
		// 	return $http.get('/api/products/getProducts', {params: queryObj}).then(function(response){
		// 		return response.data;
		// 	});
		// }
	}
})
