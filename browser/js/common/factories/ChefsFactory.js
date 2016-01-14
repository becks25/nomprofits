app.factory('ChefsFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'chefs',
        idAttribute: '_id'
    });
}).run(function(ChefsFactory) {});