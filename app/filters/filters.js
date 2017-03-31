// Remove underscores to convert to spaces
BackNineApp.filter('removeUnderscore', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});

// Format strings to dates
BackNineApp.filter("formatDate", function () {
    return function (x) {
    	if(x != null) {
    		return new Date(x).toISOString();
    	} else {
    		return "";
    	}
    };
});