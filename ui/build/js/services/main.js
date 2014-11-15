define(
	[
		'angular',
		'services/AcornService',
		'services/FileService',
		'services/UserService'
	],
	function(angular, AcornService, FileService, UserService){
		

		angular.module('sqrl.services', [])
			.service('AcornService', AcornService)
			.service('FileService', FileService)
			.service('UserService', UserService);
	});