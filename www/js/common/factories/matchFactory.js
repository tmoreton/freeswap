'use strict';

app.factory('matchFactory', function($http){
	function returnData (response) {
		return response.data;
	};

	return {

		getMatchData: function(userInfo){
			var body = userInfo;
			// console.log('userinfo: ', userInfo);
			return $http.get('/api/matches/user', {params: body}).then(returnData)
		},
		getMatchSellerData: function(userInfo){
			var body = userInfo;
			// console.log('userinfo: ', userInfo);
			return $http.get('/api/matches/seller', {params: body}).then(returnData)
		}
	}
})
