app.config(function($stateProvider) {
  $stateProvider.state('app.matches', {
    url: "/matches",
    authenticate: true,
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
      },
      matchSellerData: function(matchFactory, userInfo) {
        return matchFactory.getMatchSellerData(userInfo);
      }
    }
  })
});

app.controller('MatchesCtrl', function($scope, matchFactory, userInfo, $state, matches, $window, $location, matchSellerData, user, productFactory) {
  $scope.userInfo = userInfo;
  $scope.title = "Seller Matches"
    console.log("matchSellerData: ", matchSellerData);
  $scope.craigsListMatches = matches.craigsListData;
  $scope.appMatches = matches.appData;

    console.log("matchSellerData: ", matchSellerData);

  var titlesArr = [];
  matchSellerData.forEach(function(match) {
    if (titlesArr.indexOf(match.product.title) === -1) titlesArr.push(match.product.title);
  })

  var imageArr = [];
  matchSellerData.forEach(function(match) {
    if (imageArr.indexOf(match.product.photoUrls) === -1) imageArr.push(match.product.photoUrls);
  })

  var matchesArr = [];
  titlesArr.forEach(function(title) {
    var resultsArr = [];
    matchSellerData.forEach(function(match) {
      if (match.product.title === title) resultsArr.push(match)
    })
    matchesArr.push(resultsArr);
  })

  $scope.titles = titlesArr;
  $scope.matches = matchesArr;

  $scope.titleSeller = function(){
    $scope.title = "Seller Matches"
  }
  
  $scope.titleBuyer = function(){
    $scope.title = "Buyer Matches"
  }

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
