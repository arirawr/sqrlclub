define([
	'angular',
	'angularRoute',
	'angularAnimate',
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
			'ngAnimate',
			'sqrl.controllers',
			'sqrl.services',
			'ui.bootstrap',
			'chieffancypants.loadingBar',
			'toaster',
			'ui.ace'
		]);

		app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider){
			cfpLoadingBarProvider.latencyThreshold = 100;
		}]);
		return app;
	});