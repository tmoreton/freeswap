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


app.controller('ChatCtrl', function($scope, Chats) {
  console.log("Chat Controller initialized");

  $scope.IM = {
      textMessage: ""
  };

  Chats.selectRoom($state.params.roomId);

  var roomName = Chats.getSelectedRoomName();

  // Fetching Chat Records only if a Room is Selected
  if (roomName) {
      $scope.roomName = " - " + roomName;
      $scope.chats = Chats.all();
  }

  $scope.sendMessage = function (msg) {
      console.log(msg);
      Chats.send($scope.displayName, msg);
      $scope.IM.textMessage = "";
  }

  $scope.remove = function (chat) {
      Chats.remove(chat);
  }

});
