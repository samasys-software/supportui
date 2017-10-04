'use strict';
 
angular.module('Authentication')
 
.factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            var formDataLogin= $.param({
                    "userid": username.toLowerCase(),
					"password":password
					});
           $http({
        url: "/prodcast/global/loginp",
        method: "POST",
        data: formDataLogin,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
               
    }).success (function (data, status, headers, config) {
             
               callback(data);
    }).error(function (data, status, headers, config) {
        console.log(data);
    });
        };
 
        service.SetCredentials = function (employee) {
            
 
            $rootScope.globals = {
                currentUser: {
                    employee: employee
                    
                }
            };
 
            
            $cookieStore.put('globals', $rootScope.globals);
        };
 
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
        service.MyIssues = function (callback) {
          var employeeId =  $rootScope.globals.currentUser.employee.employeeId;
            console.log(employeeId);
            $http({
                url:"/prodcast/support/myTickets?employeeId="+employeeId,
                method:"GET"
                
            }).success(function (data, status, headers, config){
                callback(data);
            }).error(function(data, status, headers, config){
                console.log(data);
            });
            
        };
        service.newIssues = function (callback) {
          
            
            $http({
                url:"/prodcast/support/issues?status=0",
                method:"GET"
    
            }).success(function (data, status, headers, config){
                callback(data);
            }).error(function(data, status, headers, config){
                console.log(data);
            });
            
        };
           service.assignRequest = function (employeeId, issueId, callback) {
          
            var formDataLogin= $.param({
                "employeeId": employeeId,
                "issueId": issueId
					});
            $http({
                url:"/prodcast/support/assignRequest",
                method:"POST",
                data: formDataLogin,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    
            }).success(function (data, status, headers, config){
                callback(data);
            }).error(function(data, status, headers, config){
                console.log(data);
            });
            
        };
        service.getIssue = function (issueId, callback) {
            
            $http({
                url:"/prodcast/support/issueDetails?issueId="+issueId,
                method:"GET"
            }).success(function(data, status, headers, config){
                callback(data);
            }).error(function(data, status, headers, config){
                console.log(data);
            });
        };
        service.reassignTicket = function(employeeId, issueId, callback){
            
            var formDataLogin=$.param({
                "employeeId":employeeId,
                "issueId":issueId
            });
            $http({
                url:"/prodcast/support/reassignTicket",
                method:"POST",
                data: formDataLogin,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config){
                callback(data);
            }).error(function(data, status, headers, config){
                console.log(data);
            });
        };
        service.updateIssue = function(employeeId, issueId, status, comments, callback){
             var formDataLogin=$.param({
                "employeeId":employeeId,
                "issueId":issueId,
                 "status":status,
                 "comments":comments
            });
            $http({
                url:"/prodcast/support/updateTicket",
                method:"POST",
                data: formDataLogin,
                headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config){
                callback(data);
            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
        service.supportReport = function(employeeId, startDate, endDate, type, selectedEmployee, callback){
            $http({
                url:"/prodcast/support/supportReport?employeeId="+employeeId+"&startDate="+startDate+"&endDate="+endDate+"&type="+type+"&selectedEmployee="+selectedEmployee,
                method:"GET"
            }).success(function(data, status, headers, config){
                callback(data);
            }).error(function(data, status, headers, config){
                console.log(data);
            });
        }
 
        return service;
    }])
 
.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
});