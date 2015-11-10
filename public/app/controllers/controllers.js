var chatAppControllers = angular.module('chatAppControllers', []);

var username;
var timestamp;
var errorMsg;

chatAppControllers.controller('loginController', function($route, $scope, $location, FirebaseService) {

  var users = FirebaseService.getUsers();
  $scope.users = users;

  $scope.addUser = function() {
    username = $scope.newUsername;
    var promise = FirebaseService.addUser(username);
    promise.then(function(tms) {
      timestamp = tms;
      $location.url("chat/");
    }, function(reason) {
      $scope.info='Failed: ' + reason;
    }, function(update) {
      $scope.info='Failed: ' + update;
    });
  }
});

chatAppControllers.controller('setMessageController', function($location, $routeParams, $scope, FirebaseService) {

  $scope.addMessage = function() {
    var promise = FirebaseService.checkTimestamp(username,timestamp);
    promise.then(function() {
      FirebaseService.addMessage(username,$scope.newMessage);
      $scope.newMessage = '';
    }, function() {
      $location.url("/");
      errorMsg = "Error! Session is not valid.";
    });
  }
});

chatAppControllers.controller('getMessagesController', function($scope, FirebaseService) {
  var messages = FirebaseService.getMessages();
  $scope.messages = messages;
});

chatAppControllers.controller('logOutController', function($location, $scope, FirebaseService) {
  $scope.exit = function() {
    FirebaseService.logOut(username);
    $location.url("/");
  }
});
