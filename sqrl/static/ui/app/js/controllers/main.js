define(
	[
		'angular',
		'controllers/AcornController',
		'controllers/AcornsController',
		'controllers/FileController',
		'controllers/LoginController',
		'controllers/AddFileController'
	],
	function(angular, AcornController, AcornsController, FileController, LoginController, AddFileController){
		'use strict';

		return angular.module('sqrl.controllers', [])
			.controller('AcornController', AcornController)
			.controller('AcornsController', AcornsController)
			.controller('FileController', FileController)
			.controller('LoginController', LoginController)
			.controller('AddFileController', AddFileController);
	});