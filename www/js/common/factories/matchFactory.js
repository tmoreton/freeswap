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
		}
	}
})
