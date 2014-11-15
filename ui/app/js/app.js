define([
	'angular',
	'angularRoute',
	'controllers',
	'services',
	'uiBootstrap',
	'ngStrap',
	'ngStrapTpl',
	'loadingBar',
	'toaster',
	'angularAce',
	'ace',
	'aceCSS',
	'worker-css',
	'aceJS',
	'worker-javascript',
	'aceHTML',
	'worker-html',
	'ext-language_tools'
	], function(angular){
		'use strict';

		var app = angular.module('sqrl', [
			'ngRoute',
			'sqrl.controllers',
			'sqrl.services',
			'ui.bootstrap',
			'chieffancypants.loadingBar',
			'toaster',
			'ui.ace'
		]);
		return app;
	});