app.factory('EventsFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'events',
        idAttribute: '_id',
        relations: {
            hasMany: {
                partners: {
                    localKey: 'partnersId',
                    localField: 'partners'
                },
                chefs: {
                	localKey: 'chefsId',
                	localField: 'chefs'
                }
            }
        }
    });
}).run(function(EventsFactory) {});