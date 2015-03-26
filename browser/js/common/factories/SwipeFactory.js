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
        like: function(productId, sellerId, buyerId) { // Right Swipe
        	var reqObj = {
        		product: productId,
        		buyer: buyerId,
        		seller: sellerId,
        		firebase: '1234' //TEMPORARY DEVELOPMENT
        	};
        	return $http.post('api/matches',reqObj).then(function(response) {
        		return response.data;
        	});
        }
    };
});
