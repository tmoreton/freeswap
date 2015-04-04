'use strict';
app.factory('swipe', function($http) {
  function returnData (response) {
    return response.data;
  };

  return {
    addToUserLike: function(productId, userId) { // Right Swipe - Likes
      console.log("productId added to User Likes", productId)
      var bodyObj = {
        productId: productId
      };
      return $http.put('/api/users/' + userId + '/likes', bodyObj).then(returnData)
    },

    addToUserDislike: function(productId, userId) { // Left Swipe - Dislike
      console.log("ProductId added to User Dislikes", productId);
      var reqObj = {
        productId: productId
      };
      return $http.put('api/users/' + userId + '/dislikes', reqObj).then(returnData)
    },
    
    createMatch: function(product, user) {
      var reqObj;
      if (product.seller) { // APP item
        console.log('Made match for APP item')
        reqObj = {
          product: product._id,
          buyer: user._id,
          seller: product.seller
        };
      }
      else { // Craigslist item
        console.log('Made match for Craigslist Item')
        reqObj = {
          product: product._id,
          buyer: user._id,
          productUrl: product.productUrl
        }
      }
      return $http.post('api/matches', reqObj).then(function(response) {
        console.log('Match made: ', response.data)
        return response.data;
      })
    }
  };
});
