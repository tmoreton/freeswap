app.config(function($stateProvider) {
  $stateProvider.state('chat', {
    url: "/chat",
    templateUrl: "js/chat/chat.html",
    controller: 'ChatCtrl'
  })
});


app.controller('ChatCtrl', function($scope) {


})
