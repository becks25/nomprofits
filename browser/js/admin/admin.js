app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve:{
            users: (UserFactory) => {
                return UserFactory.findAll();
            },
            events: (EventsFactory) => {
                return EventsFactory.findAll();
            },
            partners: (PartnersFactory) => {
                return PartnersFactory.findAll();
            },
            chefs: (ChefsFactory) => {
                return ChefsFactory.findAll();
            }
        },

    })
    .state('admin.users', {
        url:'/users',
        templateUrl:'js/admin/admin.users.html'
    })
    .state('admin.events', {
        url:'/events',
        templateUrl:'js/admin/admin.events.html'
    })
    .state('admin.partners', {
        url:'/partners',
        templateUrl:'js/admin/admin.partners.html'
    })
    .state('admin.chefs', {
        url:'/chefs',
        templateUrl:'js/admin/admin.chefs.html'
    });

});

app.controller('AdminCtrl', function ($scope, AuthService, $state, users, events, partners, chefs) {
    $scope.users = users;
    $scope.events = events;
    $scope.partners = partners;
    $scope.chefs = chefs;
    

});