app.config(function ($stateProvider) {

    $stateProvider.state('blog', {
        url: '/blog',
        controller: 'blogController',
        templateUrl: 'js/blog/blog.html'
    });

});

app.controller('blogController', function ($scope) {


});