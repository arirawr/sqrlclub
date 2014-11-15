define(['angular', 'app'], function(angular, app){
	

	return app.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/acorns',{
			templateUrl: 'views/acorns.html',
			controller: 'AcornsController'
		})
		.when('/acorn/:acornName',{
			templateUrl: 'views/acorn.html',
			controller: 'AcornController'
		});
	}]);
});