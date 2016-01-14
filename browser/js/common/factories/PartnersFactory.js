app.factory('PartnersFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'partners',
        idAttribute: '_id'
    });
}).run(function(PartnersFactory) {});