'use strict';
app.factory('swipe', function($http) {
  return {
    addToUserLike: function(productId, userId) { // Left Swipe
      console.log("productId", productId)
      var bodyObj = {
        productId: productId
      };
      return $http.put('/api/users/' + userId, bodyObj).then(function(response) {
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
    },
    dislike: function(productId, buyerId) { // Left Swipe
      // if no buyerId, use different route
      // just provide link to craiglist product page
      if (buyerId) {
        var reqObj = {
          product: productId,
          buyer: buyerId
        };
        return $http.post('api/dislike', reqObj).then(function(response) {
          return response.data;
        });
      } else {
        return $http.get('api/productId', productId).then(function(response) {
          return response.data;
        })
      }
    }
  };
});
