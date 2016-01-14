app.config(function ($stateProvider) {

    $stateProvider.state('past', {
        url: '/past-events',
        controller: 'PastEventsController',
        templateUrl: 'js/past-events/past-events.html',
        resolve:{
        	events: (EventsFactory) => {
        		return EventsFactory.findAll();
        	}
        }
    });

});

app.controller('PastEventsController', function ($scope, events) {
  $scope.events = events;

});