app.config(function($stateProvider) {
  $stateProvider.state('app.history', {
    url: "/history",
    views: {
      'menuContent': {
        templateUrl: "js/history/history.html",
        controller: 'HistoryCtrl'
      }
    }
  })
})


app.controller('HistoryCtrl', function($scope, AuthService, $state, user) {

  user.info().then(function(user){
    $scope.userInfo = user;
    $scope.history = user.likes;
  });

})
