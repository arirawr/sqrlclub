define(['angular', 'app'], function(angular, app){
	

	return app.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/acorns',{
			templateUrl: 'views/acorns.html',
			controller: 'AcornsController'
		})
		.when('/acorn/:acornName',{
			templateUrl: 'views/acorn.html',
			controller: 'AcornController'
		})
		.otherwise({redirectTo: '/acorns'});
	}]);
});