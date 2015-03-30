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

app.controller('MatchesCtrl', function($scope, matchFactory, userInfo) {
  $scope.userInfo = userInfo;
  matchFactory.getMatchData($scope.userInfo).then(function(response){
    $scope.matches = response;
  })
})
