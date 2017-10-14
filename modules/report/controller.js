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
    



.controller('ReportController',
           ['$scope','$rootScope','$location','AuthenticationService',
           function($scope,$rootScope,$location,AuthenticationService){
  $scope.getSelectedType=function(dateType){
               $scope.type= dateType;
                  AuthenticationService.supportReport('null',$scope.startDate,$scope.endDate,dateType,'ALL',function(data){
                      if(!data.error){
                   $scope.myReports=data.serviceSupport;
                   
                   console.log(data);
                       }
                       else{
                           $scope.reportFailure= data.error;
                           $scope.reportError = data.errorMessage;
                       }
                       });
               
                  }; 
               $scope.issue= {};
  $scope.getReport=function(){

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
               
               
           }]);