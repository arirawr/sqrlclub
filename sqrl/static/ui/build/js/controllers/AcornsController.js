define([], function(){
    

    var AcornsController = function($scope, $location, $modal, AcornService, UserService){
        $scope.acorns = [];

        $scope.addAcorn = function() {
            var newAcornModal = $modal.open({
                templateUrl: 'views/addAcorn.html',
                controller: 'AddAcornController',
                size: 'sm'
            });

            newAcornModal.result.then(function(acornName){
                AcornService.addAcorn(acornName).then(function(){
                    $scope.goToAcorn(acornName);
                });
            });
        };

        $scope.goToAcorn = function(acorn){
            $location.url('/acorn/'+acorn);
        };

        var getAcorns = function(){
            AcornService.getAcorns().then(function(){
                $scope.acorns = AcornService.acorns;
            });
        };

        var login = (function(){
            var userName = UserService.getUserName();

            if(userName===''){
                var modalInstance = $modal.open({
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    size:'sm',
                    backdrop:'static',
                    keyboard:false
                });

                modalInstance.result.then(function(){
                    getAcorns();
                });
            } else {
                $scope.acorns = AcornService.acorns;
            }
        }());
    };

    return ["$scope", '$location', '$modal', 'AcornService', 'UserService', AcornsController];
});
