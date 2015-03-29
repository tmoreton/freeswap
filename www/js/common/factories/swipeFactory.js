'use strict';
app.factory('swipe', function ($http) {
    return {
        addToUserLike: function (productId, userId) { // Left Swipe
    		console.log("productId",productId)
            var bodyObj = {
    			productId: productId
    		};
            return $http.put('/api/users/' + userId, bodyObj).then(function(response){
                return response.data;
            });
        },
        like: function(productId, buyerId, sellerId) { // Right Swipe
            // App item
            if (sellerId){
            	var reqObj = {
            		product: productId,
            		buyer: buyerId,
            		seller: sellerId,
            		firebase: '1234' //TEMPORARY DEVELOPMENT
            	};
            	return $http.post('api/matches',reqObj).then(function(response) {
            		return response.data;
            	});
            // Craiglist Item
            } else {
                return $http.get('api/productId', productId).then(function(response){
                    return response.data;
                })
            }
        },
        dislike: function(productId, buyerId) { // Left Swipe
            // if no buyerId, use different route
            // just provide link to craiglist product page
            if (buyerId){
                var reqObj = {
                    product: productId,
                    buyer: buyerId
                };
                return $http.post('api/dislike',reqObj).then(function(response) {
                    return response.data;
                });
            } else {
                return $http.get('api/productId', productId).then(function(response){
                    return response.data;
                })
            }
        }
    };
});
