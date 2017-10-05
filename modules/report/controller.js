angular.module('Report')
.controller('ReportController',
           ['$scope','$rootScope','$location','AuthenticationService',
           function($scope,$rootScope,$location,AuthenticationService){
               var employeeId=$rootScope.globals.currentUser.employee.firstname;
              $scope.getSelectedType=function(){
               $scope.type=document.getElementById("selectedType").value;
               console.log($scope.type);
                  };               
              
               $scope.getReport=function(){
               
               AuthenticationService.supportReport('null',$scope.startDate,$scope.endDate,document.getElementById("selectedType").value,'ALL',function(data){
                   $scope.myReports=data.serviceSupport;
                   
                   console.log(data);
                   
               });
                   };
               
               
           }]);