app.config(function ($stateProvider) {

    $stateProvider.state('attend', {
        url: '/attend',
        controller: 'attendController',
        templateUrl: 'js/attend/attend.html',
        resolve: {
          events: (EventsFactory) => {
              return EventsFactory.findAll();
          },
          partners: (PartnersFactory) => {
              return PartnersFactory.findAll();
          },
          chefs: (ChefsFactory) => {
              return ChefsFactory.findAll();
          }
        }
    });

});

app.controller('attendController', function ($scope, events, partners, chefs) {

  $scope.allEvents = events;
  $scope.allPartners = partners;
  $scope.allChefs = chefs;

  $scope.allEvents.sort((a,b) => {
    return (new Date(b.date) - new Date(a.date));
  });

  $scope.attend = $scope.allEvents[0];
  $scope.attend.partnerInfo = [];
  $scope.attend.chefInfo = [];


  $scope.attend.partners.forEach(partner=>{
      $scope.allPartners.forEach(p=>{
        if(p._id == partner){
          $scope.attend.partnerInfo.push(p);
        }
      });

  });

  $scope.attend.chefs.forEach(chef=>{
      $scope.allChefs.forEach(c=>{
        console.log(c._id, chef);
        if(c._id == chef){
          console.log('match');
          $scope.attend.chefInfo.push(c);
          console.log($scope.attend.chefInfo);
        }
      });


  });




});