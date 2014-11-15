define([], function(){
    'use strict';

    var AcornsController = function($scope, $location, AcornService){
        $scope.acorns = [];
        $scope.newAcornName = '';

        $scope.addAcorn = function() {
            AcornService.addAcorn($scope.newAcornName);
        }

        AcornService.getAcorns().then(function(){
           $scope.acorns = AcornService.acorns;
        });

        $scope.goToAcorn = function(acorn){
            $location.url('/acorn/'+acorn);
        };
    };

    return ["$scope", '$location', 'AcornService', AcornsController];
});
