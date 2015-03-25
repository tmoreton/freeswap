app.config(function($stateProvider) {
  $stateProvider.state('app.chat', {
    url: "/chat",
    views: {
      'menuContent': {
        templateUrl: "js/chat/chat.html",
        controller: 'ChatCtrl'
      }
    }
  })
});


app.controller('ChatCtrl', function($scope, chatFactory) {

    $scope.user = "Guest"+Math.round(Math.random() *100);
    // $scope.room = Math.round(Math.random() *10000000);

    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.messages = chatFactory;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to Firebase!
      $scope.messages.$add({
        from: $scope.user,
        content: $scope.message
      });

      // reset the message input
      $scope.message = "";
    };
});
