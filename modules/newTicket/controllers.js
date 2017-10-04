'use strict';
 
angular.module('NewTicket')
 
.controller('NewTicketController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
       
        
            
        AuthenticationService.newIssues(function(data){
            $scope.countMyIssues= data.serviceSupport.length ;
            $scope.issueDetails=data.serviceSupport;
            $scope.totalIssueDetails = data.serviceSupport.length;
            console.log( data.serviceSupport.length);
            console.log(data);
          
        });
          $scope.goToIssue = function(issueId){
              
                $rootScope.issueId = issueId;
                $location.path('/issue');
                
            }
          $scope.myIssue= function(){
              $location.path('/');
          }
          $scope.logout= function(){
              $location.path('/login');
          }
        
        
      
    }]);