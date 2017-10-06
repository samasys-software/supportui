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
               var employeeId=$rootScope.globals.currentUser.employee.employeeId;
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