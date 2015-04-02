app.config(function($stateProvider) {
  $stateProvider.state('app.history', {
    url: "/history",
    authenticate: true,
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
        return user.getBuyerHistory(userInfo._id).then(function(response) {
          return response.data;
        })
      },
      getSellerHistory: function(userInfo, user) { 
        return user.getSellerHistory(userInfo._id);
      }
    }
  })
})


app.controller('HistoryCtrl', function($scope, AuthService, $state, user, getBuyerHistory, getSellerHistory) {
  $scope.buyerHistory = getBuyerHistory.likes;
  console.log("AM I LOGGING?", getBuyerHistory)
  $scope.sellerHistory = getSellerHistory;

})
