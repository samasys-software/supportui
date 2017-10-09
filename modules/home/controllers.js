'use strict';
 
angular.module('Home')
 
.controller('HomeController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
    
           AuthenticationService.MyIssues( function(data){
               if(!data.error){
                $scope.myIssues = data.serviceSupport;
               console.log(data.serviceSupport.length);
                console.log(data);
                   
                   
               }
               else{
                   $scope.myIssueFailure = data.error;
                   $scope.myIssueError = data.errorMessage;
               }
               
            });
        $scope.issueLimit=10;
          $scope.goToTicket = function(issueId){
              
                $rootScope.issueId = issueId;
                $location.path('/issue');
                
            }
          
        
      
    }]);