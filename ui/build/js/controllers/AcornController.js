define([], function(){
    

    var AcornController = function($scope, $routeParams, AcornService, FileService){
        $scope.currentAcorn = $routeParams.acornName;
        $scope.files = [];
        $scope.accordionStatus = {
            html:true,
            css:true,
            js:true
        }

        var init = (function(){
            AcornService.getAcorn($scope.currentAcorn).then(function(result){
               $scope.files = result;
               if($scope.files.length) {
                   $scope.selectFile($scope.files[0]);
               }
            });
        }());

        $scope.selectFile = function(file) {
            FileService.getFile($scope.currentAcorn, file.fileName).then(function (fileText) {
                $scope.fileText = fileText;
                $scope.fileType = file.fileType;
            });
        };
    };

    return ["$scope", '$routeParams', 'AcornService', 'FileService', AcornController];
});