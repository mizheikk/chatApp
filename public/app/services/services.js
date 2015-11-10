var chatAppServices = angular.module('chatAppServices', ['firebase']);

chatAppServices.service('FirebaseService', function($firebaseObject, $firebaseArray, $q) {
  var ref = new Firebase('https://luminous-torch-1910.firebaseio.com/');
  var usersRef = ref.child("users");
  var messagesRef = ref.child("messages");
  var messages = $firebaseArray(messagesRef);

  var data = $firebaseObject(ref);

  this.addUser = function(name) {
    var deferred = $q.defer();

    usersRef.once("value", function(snapshot) {
      if ( snapshot.child(name).exists() == false) {
        var timestamp = Date.now();
        usersRef.child(name).set(timestamp, function(error) {
          if(error) deferred.reject(error);
          else {
            deferred.resolve(timestamp);
          }
        });
      }
      else {
        deferred.reject("Username is already in use.");
      }
    });
    return deferred.promise;
  }

  this.checkTimestamp = function(name,timestamp) {
    var userRef = new Firebase('https://luminous-torch-1910.firebaseio.com/users/'+name);
    var deferred = $q.defer();

    userRef.once('value', function(data) {
      if(data.val() == timestamp)
        deferred.resolve();
      else
        deferred.reject();
    });
    return deferred.promise;
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

  this.checkTimestamp = function(name,timestamp) {
    var userRef = new Firebase('https://luminous-torch-1910.firebaseio.com/users/'+name);
    var deferred = $q.defer();

    userRef.once('value', function(data) {
      if(data.val() == timestamp)
        deferred.resolve();
      else
        deferred.reject();
    });
    return deferred.promise;
  }
});
