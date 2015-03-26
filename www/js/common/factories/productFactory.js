'use strict';

app.factory('productFactory', function($http){
	return {
		getCraigsData: function(){
			return $http.get('/api/products/rss').then(function(response){
				return response.data;
			});
		},

		addProduct: function (item){
			return $http.post('/api/products/addproduct', item).then(function(response){
				return response.data;
			});
		}
	}
})