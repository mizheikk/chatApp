var chatAppControllers = angular.module('chatAppControllers', []);

chatAppControllers.controller('loginController', function($route, $scope, $location, FirebaseService) {
  $scope.addUser = function() {
      var username = $scope.newUsername;
      var promise = FirebaseService.addUser(username);
      promise.then(function(timestamp) {
        $location.url("chat/"+username+"/"+timestamp);
      }, function(reason) {
        $scope.info='Failed: ' + reason;
      }, function(update) {
        $scope.info='Failed: ' + update;
      });
  }
});

chatAppControllers.controller('setMessageController', function($location, $routeParams, $scope, FirebaseService) {

  var username = $routeParams.user;
  var timestamp = $routeParams.timestamp;

  $scope.addMessage = function() {
    var promise = FirebaseService.checkTimestamp(username,timestamp);
    promise.then(function() {
      FirebaseService.addMessage(username,$scope.newMessage);
      $scope.newMessage = '';
    }, function() {
      $location.url("/");
      alert("Error! Rotten session..");
      });
  }
});

chatAppControllers.controller('getMessagesController', function($scope, FirebaseService) {
  var messages = FirebaseService.getMessages();
  $scope.messages = messages;
});
