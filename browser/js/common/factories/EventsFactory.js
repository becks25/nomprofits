app.factory('EventsFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'events',
        idAttribute: '_id',
        relations: {
            hasMany: {
                partners: {
                    localKey: 'partners',
                    localField: '_partners'
                },
                chefs: {
                	localKey: 'chefs',
                	localField: '_chefs'
                }
            }
        }
    });
}).run(function(EventsFactory) {});