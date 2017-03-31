'use strict';
 
angular.module('myApp.scheduler', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/scheduler', {
        templateUrl: 'scheduler/scheduler.html',
        controller: 'SchedulerController'
    });
}])
 
.controller('SchedulerController', ['$scope','AppUtil',function($scope, AppUtil) {
	$scope.jobs = [];

	function getJobs() {
		AppUtil.getJobs(
			function (response) {
				console.log(response);
				$scope.jobs = response.data;
			},
			function(error) {
				console.log(error);
			}
		);
	};

	function init() {
		getJobs();
	};

	init();
}]);