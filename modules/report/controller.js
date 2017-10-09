angular.module('Report')

.filter("statusDescription", function(){
    return function(status){

        switch (status){
            case 0:
                return "Unassigned";
            case 1:
                return "Assigned";
            case 2:
                return "Resolved";
            case 3:
                return "Closed";

        }
    }
})
.filter("customerNumber", function(){
    return function(phoneNumber, isdCode){
        return phoneNumber+isdCode;
    }
})


                



.controller('ReportController',
           ['$scope','$rootScope','$location','AuthenticationService',
           function($scope,$rootScope,$location,AuthenticationService){
               var employeeId=$rootScope.globals.currentUser.employee.employeeId;
  $scope.getSelectedType=function(){
               $scope.type=document.getElementById("selectedType").value;
                  AuthenticationService.supportReport('null',$scope.startDate,$scope.endDate,document.getElementById("selectedType").value,'ALL',function(data){
                      if(!data.error){
                   $scope.myReports=data.serviceSupport;
                   
                   console.log(data);
                       }
                       else{
                           $scope.reportFailure= data.error;
                           $scope.reportError = data.errorMessage;
                       }
                       });
               console.log($scope.type);
                  };  
               $scope.issue= {};
            
               $scope.getReport=function(){
                   console.log($scope.issue.startdate);
                   console.log($scope.issue.enddate);
          
                   AuthenticationService.supportReport('null',$scope.issue.startdate,$scope.issue.enddate,document.getElementById("selectedType").value,'ALL',function(data){
                       if(!data.error){
                   $scope.myReports=data.serviceSupport;
                   
                   console.log(data);
                       }
                       else{
                           $scope.reportFailure= data.error;
                           $scope.reportError = data.errorMessage;
                       }
               });
               }                
               
    
             
               
             AuthenticationService.supportReport('null',$scope.startDate,$scope.endDate,document.getElementById("selectedType").value,'ALL',function(data){
                   if(!data.error){
                   $scope.myReports=data.serviceSupport;
                   
                   console.log(data);
                       }
                       else{
                           $scope.reportFailure= data.error;
                           $scope.reportError = data.errorMessage;
                       }
                   
               });
                   
               
               
           }]);