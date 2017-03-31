'use strict';

angular.module('myApp.schedule', ['ngMockE2E'])

.controller('SchedulerController', function($scope) {
  $scope.removeJob = function(index) {
    $scope.jobs.splice(index, 1);
  }

  $scope.cancelJob = function(index) {
    // Remove row if nothing is saved
    if(!$scope.jobs[index]["dyno_size"]) { $scope.jobs.splice(index, 1); }
    $scope.editing[index] = false;
  }

  $scope.editJob = function(index) {
    $scope.editing[index] = true;
  };
});

describe('SchedulerController', function() {

  var $scope;

  beforeEach(module('myApp.schedule'));

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('SchedulerController', {
      $scope: $scope
    });

    $scope.editing = [];
  }));

  it('remove job expect 0', function() {
    $scope.jobs = [];
    $scope.removeJob(1);
    expect($scope.jobs.length).toBe(0);
  });

  it('remove job expect 2', function() {
    $scope.jobs = [{"id":"1"},{"id":"1"},{"id":"1"}];
    $scope.removeJob(1);
    expect($scope.jobs.length).toBe(2);
  });

  it('cancel job expect 3', function() {
    $scope.jobs = [{"dyno_size":"1"},{"dyno_size":"1"},{"dyno_size":"1"}];
    $scope.cancelJob(1);
    expect($scope.jobs.length).toBe(3);
  });

  it('remove job expect 2', function() {
    $scope.editJob(1);
    expect($scope.editing[1]).toBe(true);
  });

  it('cancel job expect 3', function() {
    $scope.editJob(2);
    expect($scope.editing[2]).toBe(true);
  });

});
