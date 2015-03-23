app.factory('Chats', function ($firebase, Rooms) {

var selectedRoomId;

var ref = new Firebase(firebaseUrl);
var chats;

return {
    all: function () {
        return chats;
    },
    remove: function (chat) {
        chats.$remove(chat).then(function (ref) {
            ref.key() === chat.$id; // true item has been removed
        });
    },
    get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
                return chats[i];
            }
        }
        return null;
    },
    getSelectedRoomName: function () {
        var selectedRoom;
        if (selectedRoomId && selectedRoomId != null) {
            selectedRoom = Rooms.get(selectedRoomId);
            if (selectedRoom)
                return selectedRoom.name;
            else
                return null;
        } else
            return null;
    },
    selectRoom: function (roomId) {
        console.log("selecting the room with id: " + roomId);
        selectedRoomId = roomId;
        if (!isNaN(roomId)) {
            chats = $firebase(ref.child('rooms').child(selectedRoomId).child('chats')).$asArray();
        }
    },
    send: function (from, message) {
        console.log("sending message from :" + from.displayName + " & message is " + message);
        if (from && message) {
            var chatMessage = {
                from: from.displayName,
                message: message,
                createdAt: Firebase.ServerValue.TIMESTAMP
            };
            chats.$add(chatMessage).then(function (data) {
                console.log("message added");
            });
        }
    }
}
});
