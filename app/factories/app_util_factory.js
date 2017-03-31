BackNineApp.factory('AppUtil', function($rootScope, $http) {
	return {
		getJobs: function(successCallback, failureCallback) {
			$http.get('json/jobs.json')
				.success(function(response) {
					successCallback(response);
				})
				.error(function(response){
					failureCallback(response);
				});
		}
	}
});