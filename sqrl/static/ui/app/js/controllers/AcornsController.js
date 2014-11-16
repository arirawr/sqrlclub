define([], function(){
    'use strict';

    var AcornsController = function($scope, $location, $modal, AcornService){
        $scope.acorns = [];
        $scope.newAcornName = '';

        $scope.addAcorn = function() {
            AcornService.addAcorn($scope.newAcornName);
        }

        $scope.goToAcorn = function(acorn){
            $location.url('/acorn/'+acorn);
        };

        var login = (function(){
            var modalInstance = $modal.open({
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                size:'sm',
                backdrop:'static',
                keyboard:false
            });

            modalInstance.result.then(function(){
                AcornService.getAcorns().then(function(){
                    $scope.acorns = AcornService.acorns;
                });
            })
        }());
    };

    return ["$scope", '$location', '$modal', 'AcornService', AcornsController];
});
