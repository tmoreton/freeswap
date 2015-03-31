app.config(function($stateProvider) {
  $stateProvider.state('app.matchforseller', {
    url: "/matchforseller",
    // templateUrl: "js/matches/matches.html",
    // controller: 'MatchesCtrl',
    views: {
      'menuContent': {
        templateUrl: "js/matches/matchforseller.html",
        controller: 'MatchSellerCtrl'
      }
    },
    resolve: {
      userInfo: function(user) {
        return user.info();
      }
    }
  })
});

// user factory to get match items and delete it from db
// product factory to got product detail from db 

app.controller('MatchSellerCtrl', function($scope, matchFactory, userInfo, user, productFactory) {
  $scope.userInfo = userInfo;
  
  matchFactory.getMatchSellerData($scope.userInfo).then(function(response){
    $scope.matches = response;
  })


  $scope.detail = function (productId){
    // console.log(productId);
  }

  $scope.delete = function (productId, buyerId){
    console.log("productId: ", productId);
    console.log("buyerId: ", buyerId); 
    $scope.productId = productId;
    $scope.buyerId = buyerId;

    user.findAndDelete($scope.productId, $scope.buyerId).then(function(response){
    console.log("got response!");
    })
  }

  // Using product Factory
  $scope.traded = function (productId, buyerId){
    console.log('productId: ', productId);
    console.log('buyerId: ', buyerId);
    productFactory.swapped(productId, buyerId).then(function(response){
      console.log('response in traded: ', response)
    })
  }

})
