'use strict';

app.factory('productFactory', function($http){
	function returnData (response) {
		return response.data;
	};
	
	return {
		getCraigsData: function(){
			return $http.get('/api/products/rss').then(returnData);
		},

		addProduct: function (item){
			console.log(item)
			return $http.post('/api/products/addProduct', item).then(returnData);
		},

		getAvailableData: function(userInfo){
			var queryObj = {
				swipedItems: userInfo.likes.concat(userInfo.dislikes),
				sellerId: userInfo._id
			};
			console.log(queryObj)
			return $http.get('/api/products/getProducts', {params: queryObj}).then(returnData);
		},
		getProduct: function(productId) {
			return $http.get('/api/products/getProducts/' + productId).then(returnData);
		},
		swapped: function(productId, userId){
			console.log('userId in factory: ', userId);
			var reqobj = {
				productId: productId,
				userId: userId
			}

			return $http.put('/api/products/swapped', reqobj).then(returnData);
		}
	}
})


