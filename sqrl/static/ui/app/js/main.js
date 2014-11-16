window.name = "NG_DEFER_BOOTSTRAP!";

require([
	'angular',
	'app',
	'routes',
	'bootstrap',
	'jquery'
	], function(angular, app){
		'use strict';

		angular.element(document).ready(function(){
			angular.bootstrap(document,['sqrl']);
		});
	});