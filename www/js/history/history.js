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
      getBuyerHistory: function(userInfo, user){
        return user.getBuyerHistory(userInfo._id)
      }
    }
  })
})


app.controller('HistoryCtrl', function($scope, AuthService, $state, user, getBuyerHistory, userInfo) {
  $scope.history = getBuyerHistory
  // user.info().then(function(user){
  //   $scope.userInfo = user;
  //   $scope.history = user.likes;
  // });

})
