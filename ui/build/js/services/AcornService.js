define([], function(){
    

    var AcornService = function($http, $q, UserService){
        var self = this;

        self.acorns = [];

        var getUserName = function(){
            return UserService.getUserName();
        };

        self.getAcorns = function() {
            /*
            return $http.get('http://sqrl.club:5000/rest/'+getUserName()+'/acorns')
                .then(function(response){
                    self.acorns = response.data;
                    return self.acorns;
                });
            */
            self.acorns = ['abc', 'acorn2', 'acorn3'];;
            var thing = $q.defer();
            thing.resolve(self.acorns);
            return thing.promise;
        };

        self.getAcorn = function (acornName){
            /*
          return $http.get('http://sqrl.club:5000/rest/'+getUserName()+'/acorns/'+acornName)
              .then(function(response){
                  return response.data;
              });
              */
            var thing = $q.defer();
            thing.resolve([
                {
                    fileName:'index.html',
                    fileType:'html'
                },
                {
                    fileName:'index2.html',
                    fileType:'html'
                },
                {
                    fileName:'index3.html',
                    fileType:'html'
                },
                {
                    fileName:'main.css',
                    fileType:'css'
                },
                {
                    fileName:'main.js',
                    fileType:'js'
                },
                {
                    fileName:'supp0rtf1l3z0r.js',
                    fileType:'js'
                }
            ]);
            return thing.promise;
        };

        self.setAcorns = function(acorns) {
            self.acorns = acorns;
        };

        self.addAcorn = function(newAcorn) {
            self.acorns.push(newAcorn);
            return $http.post('http://sqrl.club:5000/rest/'+getUserName()+'/acorns/add', {
                acornName: newAcorn
            }).then(function(response){
                return response.data;
            });
        };

        return self;
    };
    return ["$http", '$q', 'UserService', AcornService];
});
