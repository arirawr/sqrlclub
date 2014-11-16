define([], function(){
	'use strict';

	var FileService = function($http, $q, UserService){
		var self = this,
			cache = {};

		var getUserName = function(){
			return UserService.getUserName();
		};

		self.getFile = function(acornName, fileName) {
			var key = acornName+'.'+fileName;

			//if(cache[key]){
			//	$q.when(cache[key]);
			//}

			//return $http.get('http://sqrl.club:5000/rest/'+getUserName()+'/acorns/'+acornName+'/'+fileName)
			//	.then(function(result){
			//		cache[key] = result.data.file;
			//		return cache[key];
			//});
			var thing =$q.defer();
			thing.resolve('here is some random file text');
			return thing.promise;
		};

		self.saveFile = function(acornName, fileName, fileText){
			var thing = $q.defer();
			thing.resolve('yay!');
			return thing.promise;
			/*
			return $http.post('http://sqrl.club:5000/rest/'+UserService.getUserName()+'/acorns/'+acornName+'/'+fileName,
				{
					'file':fileText
				}).then(function(results){
					return results.data;
				});
			*/
		}

		return self;
	};
	return ["$http", '$q', 'UserService', FileService];
});