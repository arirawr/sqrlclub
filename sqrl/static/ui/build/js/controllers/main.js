define(
	[
		'angular',
		'controllers/AcornController',
		'controllers/AcornsController',
		'controllers/FileController',
		'controllers/LoginController'
	],
	function(angular, AcornController, AcornsController, FileController, LoginController){
		

		return angular.module('sqrl.controllers', [])
			.controller('AcornController', AcornController)
			.controller('AcornsController', AcornsController)
			.controller('FileController', FileController)
			.controller('LoginController', LoginController);
	});