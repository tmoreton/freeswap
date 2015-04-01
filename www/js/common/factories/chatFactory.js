
app.factory('chat', function($firebaseObject, $firebaseArray) {
	var ref = new Firebase("https://free-swap.firebaseio.com/");

	return {
    createRoom: $firebaseObject(ref),
    createMessages: function(roomId) {
    	return $firebaseArray(ref.child(roomId));
    }
	}
});


