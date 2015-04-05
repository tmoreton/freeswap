app.config(function($stateProvider) {
  $stateProvider.state('app.craigslist', {
    url: "/craigslist",
    authenticate: true,
    views: {
      'menuContent': {
        templateUrl: "js/craigslist/craigslist.html",
        controller: 'CraigslistCtrl'
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

app.controller('CraigslistCtrl', function($scope, matchFactory, userInfo, $state, matches, $window, $location) {
  $scope.userInfo = userInfo;
  $scope.craigsListMatches = matches.craigsListData;
  $scope.appMatches = matches.appData;

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

})