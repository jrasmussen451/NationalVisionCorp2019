four51.app.controller("CustomInquiryCtrl", ["$scope", "$location", "Email", function($scope, $location, Email){
    $scope.sendEmail = function(para) {
        para.ReqDateTime = new Date();
        Email.send(para);
        para = null;
        alert('Your inquiry has been sent');
        $location.path('catalog');
    }
    $scope.sendCorpReturnEmail = function(para) {
        para.ReqDateTime = new Date();
        Email.sendCorpReturn(para);
        para = null;
        alert('Your inquiry has been sent');
        $location.path('catalog');
    }
    $scope.sendCorpDesignRequestEmail = function(para) {
        para.ReqDateTime = new Date();
        Email.sendCorpDesignRequest(para);
        para = null;
        alert('Your inquiry has been sent');
        $location.path('catalog');
    }
    $scope.$watch(function() {
        angular.forEach($scope.user.CustomFields, function(field) {
            if (field.Name === 'AccountingCode') {
                $scope.EmailDetails.AccountingCode = field.Value;
                return field.Value;
            }
        });
    });
    $scope.$watch(function() {
        angular.forEach($scope.user.CustomFields, function(field) {
            if (field.Name === 'ExpenseType') {
                $scope.EmailDetails.ExpenseType = field.Value;
                return field.Value;
            }
        });
    });
    $scope.$watch(function() {
        angular.forEach($scope.user.CustomFields, function(field) {
            if (field.Name === 'Requestor') {
                $scope.EmailDetails.Requestor = field.Value;
                return field.Value;
            }
        });
    });
    $scope.$watch(function() {
        angular.forEach($scope.user.CustomFields, function(field) {
            if (field.Name === 'RequestorEmail') {
                $scope.EmailDetails.RequestorEmail = field.Value;
                return field.Value;
            }
        });
    });
    $scope.$watch(function() {
        angular.forEach($scope.user.CustomFields, function(field) {
            if (field.Name === 'NVIFinalPiece') {
                $scope.EmailDetails.NVIFinalPiece = field.Value;
                return field.Value;
            }
        });
    });
    $scope.$watch(function() {
        angular.forEach($scope.user.CustomFields, function(field) {
            if (field.Name === 'NVICreativeMedium') {
                $scope.EmailDetails.NVICreativeMedium = field.Value;
                return field.Value;
            }
        });
    });

    // $scope.$watch(function() {
    //     angular.forEach($scope.user.CustomFields, function(field) {
    //         if (field.Name === 'StoreGroup') {
    //             $scope.EmailDetails.StoreGroup = field.Value;
    //             return field.Value;
    //         }
    //     });
    // });
    $scope.EmailDetails = {};
    $scope.EmailDetails.ReqDateTime = new Date();
    $scope.EmailDetails.Attachment = {};
    $scope.EmailDetails.Attachment2 = {};
    $scope.EmailDetails.Attachment3 = {};
    $scope.EmailDetails.Attachment4 = {};
    $("#attachment").bind('change', function(event) {
        var file = event.target.files[0];
        if (['pdf', 'jpg', 'doc', 'docx', 'csv', 'xls', 'xlsx' ].indexOf(file.name.split('.').pop().toLowerCase()) > -1) {
            $scope.EmailDetails.Attachment.File = file;
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                $scope.EmailDetails.Attachment.Data = dataURL.split(',')[1];
            }

            reader.readAsDataURL(file);
        }
        else {
            $("#attachment").val("");
            alert('That file type is not allowed');
        }
    });
    $("#attachment2").bind('change', function(event) {
        var file = event.target.files[0];
        if (['pdf', 'jpg', 'doc', 'docx', 'csv', 'xls', 'xlsx' ].indexOf(file.name.split('.').pop().toLowerCase()) > -1) {
            $scope.EmailDetails.Attachment2.File = file;
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                $scope.EmailDetails.Attachment2.Data = dataURL.split(',')[1];
            }

            reader.readAsDataURL(file);
        }
        else {
            $("#attachment2").val("");
            alert('That file type is not allowed');
        }
    });
    $("#attachment3").bind('change', function(event) {
        var file = event.target.files[0];
        if (['pdf', 'jpg', 'doc', 'docx', 'csv', 'xls', 'xlsx' ].indexOf(file.name.split('.').pop().toLowerCase()) > -1) {
            $scope.EmailDetails.Attachment3.File = file;
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                $scope.EmailDetails.Attachment3.Data = dataURL.split(',')[1];
            }

            reader.readAsDataURL(file);
        }
        else {
            $("#attachment3").val("");
            alert('That file type is not allowed');
        }
    });
    $("#attachment4").bind('change', function(event) {
        var file = event.target.files[0];
        if (['pdf', 'jpg', 'doc', 'docx', 'csv', 'xls', 'xlsx'].indexOf(file.name.split('.').pop().toLowerCase()) > -1) {
            $scope.EmailDetails.Attachment4.File = file;
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                $scope.EmailDetails.Attachment4.Data = dataURL.split(',')[1];
            }

            reader.readAsDataURL(file);
        }
        else {
            $("#attachment4").val("");
            alert('That file type is not allowed');
        }
    });
}]);