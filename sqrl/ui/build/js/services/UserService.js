define([], function(){
    

    var UserService = function($http, $q){
        var self = this;
        self.userName = '';

        self.login = function(userName) {
            self.userName = userName;
            return $http.post('http://sqrl.club:5000/rest/login',
                {
                    userName:self.userName
                }).then(function(response){
                    return response.data;
            });
        };

        self.getUserName = function(){
            return self.userName;// ? self.userName : 'dean';
        };

        return self;
    };
    return ["$http", '$q', UserService];
});
