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

		getAvailableData: function(userInfo){ // REFACTOR THIS LATER
			var queryObj = {
				toExclude: userInfo.likes.concat(userInfo.dislikes),
				userInfoId: userInfo._id
			};
			// console.log('queryObj',queryObj)
			return $http.get('/api/products/getProducts', {params: queryObj}).then(function(response){
				return response.data;
			});
		},
		getProduct: function(productId) {
			return $http.get('/api/products/getProducts/' + productId).then(function(response) {
				return response.data;
			})
		},
		swapped: function(productId, userId){
			console.log('userId in factory: ', userId);
			var reqobj = {
				productId: productId,
				userId: userId
			}

			return $http.put('/api/products/swapped', reqobj).then(function(response){
				return response.data;
			})
		}
	}
})
