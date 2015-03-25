'use strict';
app.factory('Swipe', function ($http) {
    return {
        dislike: function (productId) {
            return $http.put('/api/user/:_productId', productId).then(function(response){
                return response.data;
            });
        }
    };

});
