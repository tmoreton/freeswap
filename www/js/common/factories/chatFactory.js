app.factory('chat', ["$firebaseArray",
  function($firebaseArray) {
    var randomRoomId = Math.round(Math.random() * 1000000000);
    var ref = new Firebase("https://freeswap.firebaseio.com");
    return $firebaseArray(ref);
  }
]);
