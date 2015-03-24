 app.factory('Rooms', function ($firebase) {
     // Might use a resource here that returns a JSON array
  var ref = new Firebase(firebaseUrl);
  var rooms = $firebase(ref.child('rooms')).$asArray();

  return {
      all: function () {
          return rooms;
      },
      get: function (roomId) {
          // Simple index lookup
          return rooms.$getRecord(roomId);
      }
  }
});
