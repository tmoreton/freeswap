app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('post', {
    url: '/post',
    controller: 'postCtrl',
    templateUrl: 'js/post/post.html'
  });
});



app.controller('postCtrl', function($scope, $ionicModal, $timeout, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('js/login/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
 
})

