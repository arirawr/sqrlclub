define([], function(){
    

    var AddFileController = function($scope, fileType, $modalInstance){
        $scope.newFileName = '.'+fileType;

        $scope.ok = function(){
            $modalInstance.close($scope.newFileName);
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

    return ["$scope", 'fileType', '$modalInstance', AddFileController];
});
