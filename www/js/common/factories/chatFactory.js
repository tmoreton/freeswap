app.factory('chat', function($firebaseObject) {
	var ref = new Firebase("https://free-swap.firebaseio.com/");

	return {
    createRoom: $firebaseObject(ref.child('rooms')),
    createMessages: function(roomId) {
    	return $firebaseObject(ref.child('rooms').child(roomId));
    }
  }
});


