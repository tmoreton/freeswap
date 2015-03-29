app.config(function($stateProvider) {
  $stateProvider.state('app.view', {
    url: "/view",
    views: {
      'menuContent': {
        templateUrl: "js/view/view.html",
        // controller: 'CardsCtrl'
      }
    }
  })
})
