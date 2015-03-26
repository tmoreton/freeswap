'use strict';
app.factory('swipe', function ($http) {
    return {
        dislike: function (productId, userId) { //Left Swipe
            return $http.put('/api/users/' + userId, productId).then(function(response){
                return response.data;
            });
        },
        like: function(productId, sellerId, buyerId) {
        	var reqObj = {
        		product: productId,
        		buyer: buyerId,
        		seller: sellerId,
        		firebase: '1234' //TEMPORARY DEVELOPMENT PURPOSES
        	};
        	return $http.post('api/matches',reqObj).then(function(response) {
        		return response.data;
        	});
        }
    };
});
