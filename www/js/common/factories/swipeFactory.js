'use strict';
app.factory('swipe', function($http) {
  return {
    addToUserLike: function(productId, userId) { // Right Swipe - Likes
      console.log("productId added to User Likes", productId)
      var bodyObj = {
        productId: productId
      };
      return $http.put('/api/users/' + userId + '/likes', bodyObj).then(function(response) {
        return response.data;
      });
    },
    addToUserDislike: function(productId, userId) { // Left Swipe - Dislike
      console.log("ProductId added to User Dislikes", productId);
      var reqObj = {
        product: productId
      };
      return $http.put('api/users/' + userId + '/dislikes', reqObj).then(function(response) {
        return response.data;
      });
    },
    createMatch: function(product, user) {
      console.log('Product', product);
      console.log('User',user);

      var reqObj;
      if (product.seller) { // APP item
        console.log('Made match for APP item')
        reqObj = {
          product: product._id,
          buyer: user._id,
          seller: product.seller,
          firebase: '1234' //TEMPORARY DEVELOPMENT
        };
      }
      else { // Craigslist item
        console.log('Made match for Craigslist Item')
        reqObj = {
          product: product._id,
          buyer: user._id,
          productUrl: product.productUrl,
          firebase: '1234' //TEMPORARY DEVELOPMENT
        }
      }
      return $http.post('api/matches', reqObj).then(function(response) {
        return response.data;
      })
    }
  };
});
