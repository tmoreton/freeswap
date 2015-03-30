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
			var queryObj = {
				toExclude: userInfo.likes.concat(userInfo.dislikes) // Combines likes and dislikes array
			};
			console.log('queryObj',queryObj)
			return $http.get('/api/products/getProducts', {params: queryObj}).then(function(response){
				return response.data;
			});
		}
	}
})
