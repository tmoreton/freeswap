app.config(function($stateProvider) {
  $stateProvider.state('app.matches', {
    url: "/matches",
    // templateUrl: "js/matches/matches.html",
    // controller: 'MatchesCtrl',
    views: {
      'menuContent': {
        templateUrl: "js/matches/matches.html",
        controller: 'MatchesCtrl'
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

app.controller('MatchesCtrl', function($scope, matchFactory, userInfo, user) {
  $scope.userInfo = userInfo;
  matchFactory.getMatchData($scope.userInfo).then(function(response){
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
  }

  // user.findAndDelete($scope.productId, $scope.buyerId).then(response){
  //   console.log("got response: ", response);
  // }
})
