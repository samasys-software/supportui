'use strict';
 
angular.module('Issue')
 
.controller('IssueController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
       
        AuthenticationService.getIssue($rootScope.issueId,function(data){
            $scope.issue = data.serviceSupport["0"];
            
            console.log( data);
            
            
        });
        $scope.assignToMe = function(){
            $scope.employeeId = $rootScope.globals.currentUser.employee.employeeId;
            AuthenticationService.assignRequest($scope.employeeId, $rootScope.issueId, function(data){
                 if(!data.error) {
                    console.log(data);
                    
                } else {
                    $scope.error = data.errorMessage;
                    $scope.dataLoading = false;
                    
                }
            });
        }
       $scope.viewMyTicket = function(){
            $location.path('/');
       }
      $scope.assignToSomeone = function(){
          $scope.employeeId = $rootScope.globals.currentUser.employee.employeeId;
          AuthenticationService.reassignTicket($scope.employeeId,$rootScope.issueId,function(data){
              
          });
      }
      $scope.saveIssue = function(){
          
      }
   $scope.comments = function(){
       $scope.newComment = document.getElementById("myText").value;
       console.log($scope.newComment);
   }
   $scope.getSelectedStatus = function(){
       $scope.status = document.getElementById("selectedStatus").value;
       console.log($scope.status);
   }
 
    }]);