'use strict';

// Declare app level module which depends on views, and components
var BackNineApp = angular.module('myApp', [
  'ngRoute',
  'myApp.scheduler'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/scheduler'});
}]);
