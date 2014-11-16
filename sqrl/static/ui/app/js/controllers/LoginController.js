define([], function(){
    'use strict';

    var LoginController = function($scope, $modalInstance, UserService){
        $scope.userName = '';

        $scope.login = function() {
            UserService.login($scope.userName).then(function(){
                $modalInstance.close();
            })
        };

        $scope.enter = function(event){
            if(event.which ===13){
                $scope.login();
            }
        };
    };

    return ["$scope", '$modalInstance', 'UserService', LoginController];
});