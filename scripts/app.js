'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Issue', []);
angular.module('NewTicket', []);
angular.module('Report',[]);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home','Issue',
    'NewTicket','Report',
    'ngRoute',
    'ngCookies',
    'ngSanitize'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        .when('/issue', {
            controller:'IssueController',
            templateUrl: 'modules/issues/views/issues.html'
        })
        .when('/newTicket',{
            controller: 'NewTicketController',
            templateUrl: 'modules/newTicket/views/newTicket.html'
    })
    .when('/report',{
        controller:'ReportController',
        templateUrl:'modules/report/views/report.html'
    })
   
 
        .otherwise({ redirectTo: '/login' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);