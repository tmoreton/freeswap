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
      },
      matches: function(matchFactory, userInfo) {
        return matchFactory.getMatchData(userInfo);
      }
    }
  })
});

app.controller('MatchesCtrl', function($scope, matchFactory, userInfo, $state, matches, $window, $location) {
  $scope.userInfo = userInfo;
  $scope.craigslistMatches = matches.craigslistData;
  $scope.appMatches = matches.appData;

  $scope.goToChat = function(match){
    console.log("match", match)
    $state.go('app.chat', {
      '_id': match._id
    })
  };

  $scope.goToUrl = function(url) {
    $window.open(url);
  }

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
