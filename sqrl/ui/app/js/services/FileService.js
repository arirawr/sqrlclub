define([], function(){
	'use strict';

	var FileService = function($http, $q, UserService){
		var self = this,
			//cache = {},
			templateFiles=[
				{
					fileType:'html',
					fileName:'index.html'
				},
				{
					fileType:'js',
					fileName:'app.js'
					},
				{
					fileType:'css',
					fileName:'main.css'
				}
			],
			template = {
				'js':'(function(window, document, undefined){\n\n}(window,document));',
				'html':'<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>My awesome page!</title>\n\t\t<link rel="stylesheet" type="text/css" media="all" href="main.css"/>\n\t</head>\n\t<body>\n\t\t<p>My awesome website!</p>\n\t\t<script src="app.js"></script>\n\t</body>\n</html>',
				'css':'body {\n\tbackground-color:Red;\n}\n\np {\n\tcolor:white;\n}'
			};

		var getUserName = function(){
			return UserService.getUserName();
			return UserService.getUserName();
		};

		self.getTemplateFiles = function(acornName){
			createTemplateFilesOnServer(acornName);
			return templateFiles;
		};

		var createTemplateFilesOnServer = function(acornName){
			angular.forEach(templateFiles,function(file){
				self.getFile(acornName,file.fileName,file.fileType);
			});
		};

		self.getFile = function(acornName, fileName, fileType) {
			//var thing =$q.defer();
			//thing.resolve(template[fileType]);
			//return thing.promise;

			//var key = acornName+'.'+fileName;

			//if(cache[key]){
			//	$q.when(cache[key]);
			//}

			var promise = $http.get('http://sqrl.club:5000/rest/'+getUserName()+'/acorns/'+acornName+'/'+fileName)
				.then(function(result){
					if(!result.data.file){
						result.data.file = template[fileType];
					}
					//cache[key] = result.data.file;
					return {
						fileName: fileName,
						fileData: result.data.file
					};
				});

			return promise;
		};

		self.saveFile = function(acornName, fileName, fileText){
			//var thing = $q.defer();
			//thing.resolve('yay!');
			//return thing.promise;

			//var key = acornName+'.'+fileName;
			//cache[key] = fileText;

			return $http.post('http://sqrl.club:5000/rest/'+UserService.getUserName()+'/acorns/'+acornName+'/'+fileName,
				{
					'file':fileText
				}).then(function(results){
					return results.data;
				});

		};



		return self;
	};
	return ["$http", '$q', 'UserService', FileService];
});