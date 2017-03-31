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
	$scope.editing = [];
	$scope.dyno_sizes = ["1X", "2X", "PX"];

	$scope.addJob = function() {
		var today = new Date();
		var tempJob = {"id": "",
			"dyno_size": "",
			"frequency": "",
			"last_run": null,
			"next_due": today};
		$scope.jobs.push(tempJob);

		var length = $scope.jobs.length > 0 ? $scope.jobs.length - 1 : 0;
		$scope.editing[length] = true
	}

	$scope.removeJob = function(index) {
		$scope.jobs.splice(index, 1);
	}

	$scope.saveJob = function(index) {
		$scope.editing[index] = false;
	}

	$scope.editJob = function(index) {
		$scope.editing[index] = true;
	};

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

BackNineApp.filter('removeUnderscore', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});

BackNineApp.filter("formatDate", function () {
    return function (x) {
    	if(x != null) {
    		return new Date(x).toISOString();
    	} else {
    		return "";
    	}
    };
});