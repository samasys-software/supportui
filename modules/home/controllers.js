'use strict';
 
angular.module('Home')
 
.controller('HomeController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
       
        AuthenticationService.newIssues(function(data){
            $scope.countMyIssues= data.serviceSupport.length ;
            $scope.issueDetails=data.serviceSupport;
            console.log( data.serviceSupport.length);
            console.log(data);
        });
        
      
    }]);