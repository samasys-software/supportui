'use strict';
 
angular.module('NewTicket')
 
.controller('NewTicketController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
       
        
            
        AuthenticationService.newIssues(function(data){
            if(!data.error){
            $scope.countMyIssues= data.serviceSupport.length ;
            $scope.issueDetails=data.serviceSupport;
            $scope.totalIssueDetails = data.serviceSupport.length;
            console.log( data.serviceSupport.length);
            console.log(data);
            }
            else{
                $scope.newTicketFailure=data.error;
                $scope.newTicketError = data.errorMessage;
            }
          
        });
            $scope.issueDetailLimit=10;
          $scope.goToIssue = function(issueId){
              
                $rootScope.issueId = issueId;
                $location.path('/issue');
                
            }
         
        
        
      
    }]);