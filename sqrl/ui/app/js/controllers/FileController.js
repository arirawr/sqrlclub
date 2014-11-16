define([], function(){
	'use strict';

	var FileController = function($scope, FileService){

		var fileChanged = function(event, obj){

			var acornName = obj.currentAcorn,
				fileName = obj.file.fileName,
				fileType = obj.file.fileType;

			FileService.getFile(acornName, fileName).then(function(file){
				$scope.file = file;
			});
		};

		$scope.$on('fileChanged', fileChanged);

	};

	return ["$scope", 'FileService', FileController];
});