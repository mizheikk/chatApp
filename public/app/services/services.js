var chatAppServices = angular.module('chatAppServices', ['firebase']);

chatAppServices.service('FirebaseService', function($firebaseObject, $firebaseArray, $q) {
  var databaseURL = 'https://luminous-torch-1910.firebaseio.com';
  var dataRef = new Firebase(databaseURL);
  //var data = $firebaseObject(dataRef);

  this.addUser = function(name) {
    var ref= new Firebase(databaseURL);
    var usersRef = ref.child("users");
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
        deferred.reject("username is already in use.");
      }
    });
    return deferred.promise;
  }

  this.addMessage = function(name,msg) {
    var ref= new Firebase(databaseURL);
    var messagesRef = ref.child('messages');
    var newMessage = messagesRef.push();
    newMessage.set({
      author:name,
      message:msg
    });
  }

  this.getMessages = function() {
    var messagesRef = dataRef.child("messages");
    /*
    var query = messagesRef.limitToLast(8);
    var messages = $firebaseArray(query);
    */
    var messages = $firebaseArray(messagesRef);

    return messages;
  }

  this.getUsers = function() {
    var usersRef = dataRef.child("users");
    var users = $firebaseArray(usersRef);
    return users;
  }

  this.checkTimestamp = function(name,timestamp) {
    var ref = new Firebase(databaseURL+'/users/'+name);
    var deferred = $q.defer();

    ref.once('value', function(data) {
      if(data.val() == timestamp)
        deferred.resolve();
      else
        deferred.reject();
    });
    return deferred.promise;
  }

  this.logOut = function(name) {
    var ref = new Firebase(databaseURL+'/users/'+name);
    ref.remove();
  }
});
