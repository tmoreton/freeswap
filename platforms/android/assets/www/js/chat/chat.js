app.config(function($stateProvider) {
  $stateProvider.state('app.chat', {
    url: "/chat/:_id",
    authenticate: true,
    views: {
      'menuContent': {
        templateUrl: "js/chat/chat.html",
        controller: 'ChatCtrl'
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


app.controller('ChatCtrl', function($scope, chat, userInfo, matches, $stateParams, $firebaseArray) {
    $scope.firebase = chat.createMessages($stateParams._id);
    $scope.user = userInfo;
    $scope.roomId = $stateParams._id;

    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.rooms = chat;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(), except that it saves the changes to Firebase!
      $scope.firebase.$add({
          from: $scope.user.username,
          content: $scope.message
      });
      console.log($scope.firebase)
      // reset the message input
      $scope.message = "";
    };
});
