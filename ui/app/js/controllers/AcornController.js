define([], function(){
    'use strict';

    var AcornController = function($scope, $routeParams, AcornService, FileService){
        var currentAcorn = $routeParams.acornName;
        $scope.files = [];

        var init = (function(){
            AcornService.getAcorn(currentAcorn).then(function(result){
               $scope.files = result;
               if($scope.files.length) {
                   $scope.selectFile($scope.files[0]);
               }
            });
        }());

        $scope.selectFile = function(file) {
            FileService.getFile(currentAcorn, file.fileName).then(function (fileText) {
                $scope.fileText = fileText;
                $scope.fileType = file.fileType;
            });
        };
    };

    return ["$scope", '$routeParams', 'AcornService', 'FileService', AcornController];
});