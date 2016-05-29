/*
    Author: Auro Mota <auro@blueorc.com>
    (c) 2016 BlueOrc http://blueorc.com/
*/

(function() {
    'use strict';

    app.factory('crudService', crudService);

    crudService.$inject = ['$q', 'dbService'];

    function crudService($q, dbService) {
        var service = {
            find: find,
            insert: insert,
            insertOrReplace: insertOrReplace,
            findAll: findAll,
            remove: remove,
            update: update
        }

        return service;

        function insert(data, table) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                var row = table.createRow(data);
                dbService.db.insert()
                    .into(table)
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

        function insertOrReplace(data, table) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                var row = table.createRow(data);
                dbService.db.insertOrReplace()
                    .into(table)
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

        function find(value, table, column) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                dbService.db.select()
                    .from(table)
                    .where(table[column].eq(value))
                    .exec()
                    .then(function(results) {
                        if(angular.isDefined(results)) {
                            deferred.resolve(results);
                        } else {
                            deferred.reject();
                        }
                    });
            });
            return deferred.promise;
        }

        function findAll(table) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                dbService.db.select()
                    .from(table)
                    .exec()
                    .then(function(results) {
                        if(angular.isDefined(results)) {
                            deferred.resolve(results);
                        } else {
                            deferred.reject();
                        }
                    });
            });
            return deferred.promise;
        }

        function remove(value, table, column) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                dbService.db.delete()
                    .from(table)
                    .where(table[column].eq(value))
                    .exec()
                    .then(function(result) {
                        deferred.resolve(result);
                    }, function(err) {
                        deferred.reject(err);
                    })
            });
            return deferred.promise;
        }

        function update(id, data, table) {
            var deferred = $q.defer();
            dbService.connect().then(function() {
                var query = dbService.db.update(table);
                var columns = Object.keys(data);
                columns.forEach(function(column) {
                    if(column != table.id.name_) {
                        query = query.set(table[column], data[column]);
                    }
                });
                query.where(table[table.id.name_].eq(id)).exec().then(
                    function(result) {
                        deferred.resolve(result);
                    }, function(err) {
                        deferred.reject(err);
                    }
                )
            });
            return deferred.promise;
        }
    }

})();
