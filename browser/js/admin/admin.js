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

app.controller('AdminCtrl', function ($scope, AuthService, $state, users, events, partners, chefs, UserFactory, $uibModal, CurrentFactory) {
    $scope.users = users;
    $scope.events = events;
    $scope.partners = partners;
    $scope.chefs = chefs;
    

    $scope.items = [
                { label: 'Users', state: 'admin.users' },
                { label: 'Events', state: 'admin.events' },
                { label: 'Partners', state:'admin.partners' },
                { label: 'Chefs', state:'admin.chefs' }
            ];

    $scope.newUser = {
        name: '',
        email: '',
        isSuperAdmin: false
    };

    $scope.saveUser = () => {
        console.log($scope);
        UserFactory.create($scope.newUser)
            .then(user => {
              console.log('success!');
              $scope.newUser = {};
//              $scope.addUser.$setPristine();
              $scope.users.push(user);
            }).catch(() => {
              console.log('error?');
            });
    };

    $scope.open = function (partner) {
        console.log(partner);
            CurrentFactory.currentPartner = partner;
            var modalInstance = $uibModal.open({
              templateUrl: 'js/common/directives/modals/partner-modal.html',
              controller: 'partnerModalCtrl'
            });
    };

    $scope.open_chef = function(chef){
        CurrentFactory.currentChef = chef;
        var modalInstance = $uibModal.open({
          templateUrl: 'js/common/directives/modals/chef-modal.html',
          controller: 'chefModalCtrl'
        });
    }
});