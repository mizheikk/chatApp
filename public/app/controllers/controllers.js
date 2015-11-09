var chatAppControllers = angular.module('chatAppControllers', []);

chatAppControllers.controller('loginController', function($route, $scope, $location) {
  $scope.addUser = function() {
      var username = $scope.newUsername;
      $scope.newUsername = 'joo';
      console.log($location.url());
      $location.url("chat/"+username);
      //$location.url("chat.html?user="+username);
  }
});

chatAppControllers.controller('setMessageController', function($routeParams, $scope, FirebaseService) {

  var username = $routeParams.user;

  $scope.addMessage = function() {
    FirebaseService.addMessage(username,$scope.newMessage);
    $scope.newMessage = '';
  }
});

chatAppControllers.controller('getMessagesController', function($scope, FirebaseService) {
  var messages = FirebaseService.getMessages();
  $scope.messages = messages;
});
