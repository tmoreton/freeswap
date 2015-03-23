app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('front-page', {
    url: "/front-page",
    templateUrl: "/js/common/directives/front-page/front-page.html",
    controller: 'FrontPageCtrl'
  })
});

app.controller('FrontPageCtrl', function($scope, $ionicModal, $timeout, $state) {

})
