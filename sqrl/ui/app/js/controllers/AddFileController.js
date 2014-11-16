define([], function(){
    'use strict';

    var AddFileController = function($scope, $modalInstance){
        $scope.newFileName = '';
        $scope.fileTypes = [
            {ID:'.js', val:'.js'},
            {ID:'.html', val:'.html'},
            {ID:'.css', val:'.css'}
        ];
        $scope.fileType='';

        $scope.ok = function(){
            var file={
                fileType:$scope.fileType,
                fileName:$scope.newFileName+$scope.fileType
            };
            $modalInstance.close(file);
        };

        $scope.enter = function(event){
          if(event.which ===13){
              $scope.ok();
          }
        };

        $scope.cancel = function(){
            $modalInstance.dismiss(null);
        };

        var init = (function(){
            var ele =angular.element($('.add-file input'));
            ele.focus();
        }());
    };

    return ["$scope", '$modalInstance', AddFileController];
});
