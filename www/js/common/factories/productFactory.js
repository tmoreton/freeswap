'use strict';

app.factory('productFactory', function($http){
	return {
		getCraigsData: function(){
			return $http.get('/api/products/rss').then(function(response){
				return response.data;
			});
		},

		addProduct: function (item){
			console.log(item)
			return $http.post('/api/products/addProduct', item).then(function(response){
				return response.data;
			});
		},

		getAvailableData: function(userInfo){
			var bodyObj = {
				likesArr: userInfo.likes
			};
			// console.log('bodyObj',bodyObj)
			return $http.get('/api/products/getProducts', {params: bodyObj}).then(function(response){
				return response.data;
			});
		}
	}
})
