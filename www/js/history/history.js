app.config(function($stateProvider) {
  $stateProvider.state('app.history', {
    url: "/history",
    views: {
      'menuContent': {
        templateUrl: "js/history/history.html",
        controller: 'HistoryCtrl'
      }
    },
    resolve: {
      userInfo: function(user) {
        return user.info();
      },
      getBuyerHistory: function(userInfo, user) {
        return user.getBuyerHistory(userInfo._id)
      },
      getSellerHistory: function(userInfo, user) {
        return user.getSellerHistory(userInfo._id);
      }
    }
  })
})


app.controller('HistoryCtrl', function($scope, AuthService, $state, user, getBuyerHistory, getSellerHistory) {
  $scope.buyerHistory = getBuyerHistory.likes;
  console.log(getBuyerHistory)
  $scope.sellerHistory = getSellerHistory;

})
