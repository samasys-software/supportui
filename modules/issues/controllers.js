'use strict';
 
angular.module('Issue')
 
.controller('IssueController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
      
       
        AuthenticationService.getIssue($rootScope.issueId,function(data){
            if(!data.error){
            var issue = data.serviceSupport["0"];
            $scope.issue = issue ;
            console.log( data);
            }
            else{
                $scope.issueFailure = data.error;
                $scope.issueError= data.errorMessage;
            }
            
        });
       
        $scope.assignToMe = function(){
            $scope.employeeId = $rootScope.globals.currentUser.employee.employeeId;
            AuthenticationService.assignRequest($scope.employeeId, $rootScope.issueId, function(data){
                 if(!data.error) {
                    console.log(data.error);
                    $scope.success = data.error;
                } else {
                    
                    $scope.failure = data.error;
                    $scope.error = data.errorMessage;
                    $scope.dataLoading = false;
                }
            });
        }
      
      $scope.assignToSomeone = function(){
          $scope.employeeId = $rootScope.globals.currentUser.employee.employeeId;
          AuthenticationService.reassignTicket($scope.employeeId,$rootScope.issueId,function(data){
              
          });
      }
      
      $scope.saveIssue = function(){
           $scope.newComment = document.getElementById("myText").value;
          $scope.employeeId = $rootScope.globals.currentUser.employee.employeeId;
          
          AuthenticationService.updateIssue($scope.employeeId, $rootScope.issueId, document.getElementById("selectedStatus").value, $scope.newComment, function(data){
              
               if(!data.error) {
                   $scope.saveSuccess = data.error;
                    console.log(data);
                   AuthenticationService.getIssue($rootScope.issueId, function(data){
                   if(!data.error){
                       var issue = data.serviceSupport["0"];
                   $scope.issue = issue ;
            console.log( data);
            }
            else{
                $scope.issueFailure = data.error;
                $scope.issueError= data.errorMessage;
            }

              });

                } else {
                    $scope.saveFailure = data.error;
                    $scope.SaveError = data.errorMessage;
                    $scope.dataLoading = false;
                } 
     
              
          });
        
      }
 
   $scope.getSelectedStatus = function(){
       $scope.status = document.getElementById("selectedStatus").value;
       
   }
   console.log($scope.status);
 
    }]);