app.config(function($stateProvider) {
  $stateProvider.state('app.chat', {
    url: "/chat/:_id",
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
    var ref = new Firebase("https://freeswap.firebaseio.com");
    var roomRef = ref.child($stateParams._id)
    $scope.firebase = $firebaseArray(roomRef);

    $scope.user = userInfo;
    $scope.roomId = $stateParams._id;
    // $scope.room = Math.round(Math.random() *10000000);
    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.rooms = chat;
    // $scope.roomRef = ref.child("room")
    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(), except that it saves the changes to Firebase!
      $scope.firebase.$add({
          from: $scope.user.username,
          content: $scope.message
      });

      // reset the message input
      $scope.message = "";
    };
});
