/*
    Author: Auro Mota <auro@blueorc.com>
    (c) 2016 BlueOrc http://blueorc.com/
*/

(function() {
    'use strict';

    app.factory('userService', userService);

    userService.$inject = ['$q', 'dbService'];

    function userService($q, dbService) {
        var service = {
            getById: getById,
            save: save
        }

        return service;

        function save(user) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                var row = dbService.users.createRow(user);
                dbService.db.insertOrReplace()
                    .into(dbService.users)
                    .values([row])
                    .exec()
                    .then(function(response) {
                        deferred.resolve(response[0]);
                    }, function(err) {
                        deferred.reject(err);
                    })
            });
            return deferred.promise;
        }

        function getById(id) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                dbService.db.select()
                    .from(dbService.users)
                    .where(dbService.users.id.eq(id))
                    .exec()
                    .then(function(results) {
                        if(angular.isDefined(results) && results.length == 1) {
                            deferred.resolve(results[0]);
                        } else {
                            deferred.reject();
                        }
                    });
            });
            return deferred.promise;
        }
    }

})();