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

	// Add Job
	$scope.addJob = function() {
		var today = new Date();
		var tempJob = {"id": "",
			"dyno_size": "",
			"frequency": "",
			"last_run": null,
			"next_due": today};
		$scope.jobs.push(tempJob);

		var length = $scope.jobs.length > 0 ? $scope.jobs.length - 1 : 0;
		$scope.editing[length] = true;
	}

	// Remove Job
	$scope.removeJob = function(index) {
		$scope.jobs.splice(index, 1);
	}

	// Cancel edit or adding new job
	$scope.cancelJob = function(index) {
		// Remove row if nothing is saved
		if(!$scope.jobs[index]["dyno_size"]) { $scope.jobs.splice(index, 1); }
		$scope.editing[index] = false;
	}

	// make sure form has required fields
	$scope.validateForm = function(index) {
		var errors = '';
		var index = index > 0 ? index - 1 : 0;

		if($scope.jobs[index]["dyno_size"]) {
			errors += "Please add a dyno size. "
		}	
		if($scope.jobs[index]["frequency"]) {
			errors += "Please add a frequency."
		}

		return errors;
	}

	// Save Job
	$scope.saveJob = function(index) {
		var errors = $scope.validateForm(index);

		if(errors.length > 0) {
			alert(errors);
			return;
		}
		$scope.editing[index] = false;
	}

	// Show edit fields
	$scope.editJob = function(index) {
		$scope.editing[index] = true;
	};

	// get all jobs in JSON file
	function getJobs() {
		AppUtil.getJobs(
			function (response) {
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