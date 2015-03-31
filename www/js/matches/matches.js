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

app.controller('MatchesCtrl', function($scope, matchFactory, userInfo, matches, $state, chat) {
  $scope.userInfo = userInfo;
  $scope.matches = matches;
  $scope.goToChat = function(match){
    console.log("match", match)
    $state.go('app.chat', {
      '_id': match._id
    })
  };

  // $scope.openChatRoom = function (roomId) {
  //   $state.go('tab.chat', {
  //       roomId: roomId
  //   });
  // }
})
