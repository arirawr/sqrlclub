define([], function(){
    

    var AddAcornController = function($scope, $modalInstance){
        $scope.newAcornName = '';

        $scope.ok = function(){
            $modalInstance.close($scope.newAcornName);
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
            var ele =angular.element($('input'));
            ele.focus();
        }());
    };

    return ["$scope", '$modalInstance', AddAcornController];
});
