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
                      $scope.myReports=data.serviceSupport;
                       });
               console.log($scope.type);
                  };  
               $scope.issue= {};
            
               $scope.getReport=function(){
                   console.log($scope.issue.startdate);
                   console.log($scope.issue.enddate);
                   $scope.checkErr = function(startDate,endDate){
    $scope.errMessage = '';
    $scope.curDate = new Date();

    if(startDate < endDate){
      $scope.errMessage = 'End Date should be greate than start date';
      return false;
    }
    if(startDate < curDate){
       $scope.errMessage = 'Start date should not be before today.';
       return false;
    }

  };
                   AuthenticationService.supportReport('null',$scope.issue.startdate,$scope.issue.enddate,document.getElementById("selectedType").value,'ALL',function(data){
                   $scope.myReports=data.serviceSupport;
                   
                   console.log(data);
                   
               });
               }                
               
    
             
               
             AuthenticationService.supportReport('null',$scope.startDate,$scope.endDate,document.getElementById("selectedType").value,'ALL',function(data){
                   $scope.myReports=data.serviceSupport;
                   
                   console.log(data);
                   
               });
                   
               
               
           }]);