four51.app.controller('ContactUsCtrl', ['$scope', 'Email',
    function ($scope, Email) {
        $scope.emailDetails = {};

        $scope.emailSent = false;

        $scope.sendEmail = function() {
            Email.send($scope.emailDetails);
            $scope.emailSent = true;
            $scope.emailDetails = {};
        }
    }
]);