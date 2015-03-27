'use strict';
app.factory('swipe', function ($http) {
    return {
        dislike: function (productId, userId) { // Left Swipe
        		var bodyObj = {
        			productId: productId
        		};
            return $http.put('/api/users/' + userId, bodyObj).then(function(response){
                return response.data;
            });
        },
        like: function(productId, buyerId, sellerId) { // Right Swipe
            // if no sellerId, use different route 
            // just provide link to craiglist product page
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
            } else {
                return $http.get('api/productId', productId).then(function(response){
                    return response.data;
                })
            }
        }
    };
});
