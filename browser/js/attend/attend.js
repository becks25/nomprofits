app.config(function ($stateProvider) {

    $stateProvider.state('attend', {
        url: '/attend',
        controller: 'attendController',
        templateUrl: 'js/attend/attend.html',
        resolve: {
          events: (EventsFactory) => {
              return EventsFactory.findAll();
          }
        }
    });

});

app.controller('attendController', function ($scope, events) {

  $scope.temp = {
      title: 'Testing page',
      date: new Date('February 15, 2016 06:00:00'),
      price: 45,
      place: 'Somewhere awesome',
      location: '337 E 13th st, New York, NY 10003',
      url: '',
      about: 'The first Nomprofits event will showcase three amazing nonprofits in the education and youth development spaces. Over the course of the evening, you\'ll hear short presentations from leaders of each of the non-profits while enjoying a delicious dinner with friends, old and new. We\'re also planning some entertainment for the evening--it\'ll be a great time. The nonprofits presenting at the education and youth development dinner are',
      menu: 'Delicious noms'

  }

  $scope.attend = $scope.temp;



});