var chatApp = angular.module('chatApp', ['ngRoute','chatAppControllers','chatAppServices']);

chatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/chat/:user', {
        templateUrl: 'chat.html'
      }).
      otherwise({
        templateUrl: 'login.html'
      });
  }]);
