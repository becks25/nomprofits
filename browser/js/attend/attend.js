app.config(function ($stateProvider) {

    $stateProvider.state('attend', {
        url: '/attend',
        controller: 'attendController',
        templateUrl: 'js/attend/attend.html'
    });

});

app.controller('attendController', function ($scope) {


});