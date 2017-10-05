'use strict';
 
angular.module('Home')
 
.controller('HomeController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
    
           AuthenticationService.MyIssues( function(data){
                $scope.myIssues = data.serviceSupport;
               console.log(data.serviceSupport.length);
                console.log(data);
            });
        $scope.issueLimit=10;
          $scope.goToTicket = function(issueId){
              
                $rootScope.issueId = issueId;
                $location.path('/issue');
                
            }
          $scope.viewNew = function(){
              $location.path('/newTicket');
          }
          $scope.logout = function(){
              $location.path('/login');
          }
          $scope.viewReport = function(){
              $location.path('/report');
          }
        
      
    }]);