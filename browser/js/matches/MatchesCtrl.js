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
    }
  })
});


app.controller('MatchesCtrl', function($scope) {


})
