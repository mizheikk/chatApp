var chatAppServices = angular.module('chatAppServices', ['firebase']);

chatAppServices.service('FirebaseService', function($firebaseObject, $firebaseArray) {
  var ref = new Firebase('https://luminous-torch-1910.firebaseio.com/');
  var usersRef = ref.child("users");
  var messagesRef = ref.child("messages");
  var messages = $firebaseArray(messagesRef);

  var data = $firebaseObject(ref);

  this.addUser = function(name) {
    usersRef.once("value", function(snapshot) {
      if ( snapshot.child(name).exists() == false) {
        usersRef.child(name).set('');
      }
    });
  }

  this.getMessages = function() {
    return messages;
  }

  this.addMessage = function(name,msg) {
    var newMessage = messagesRef.push();
    newMessage.set({
      author:name,
      message:msg
    });
  }
});
