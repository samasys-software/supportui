'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(data) {
                if(!data.error) {
                    AuthenticationService.SetCredentials(data.employee);
                    $location.path('/');
                } else {
                    $scope.error = data.errorMessage;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);