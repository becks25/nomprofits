app.config(function ($stateProvider) {

    $stateProvider.state('partners', {
        url: '/partners',
        controller: 'PartnerController',
        templateUrl: 'js/partners/partners.html',
        resolve:{
        	partners: (PartnersFactory) => {
        		return PartnersFactory.findAll();
        	}
        }
    });

});

app.controller('PartnerController', function ($scope, partners) {
  $scope.partners = partners;

});