var chatAppControllers = angular.module('chatAppControllers', []);

chatAppControllers.controller('setMessageController', function($scope, FirebaseService) {

  $scope.addMessage = function() {
    FirebaseService.addMessage("x",$scope.newMessage);
    $scope.newMessage = '';
  }
});

chatAppControllers.controller('getMessagesController', function($scope, FirebaseService) {
  var messages = FirebaseService.getMessages();
  $scope.messages = messages;
});
