define([], function(){
    

    var LoginController = function($scope, $location, UserService){
        $scope.userName = '';

        $scope.login = function() {
            UserService.login($scope.userName).then(function(response) {
                $location.url('/acorns')
            });
        };
    };

    return ["$scope", '$location', 'UserService', LoginController];
});