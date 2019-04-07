angular.module('OrderCloud-PageFooter', []);

angular.module('OrderCloud-PageFooter')
    .directive('pagefooter', pagefooter)
    .controller('PageFooterCtrl', PageFooterCtrl)
;

function pagefooter() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'PageFooterCtrl'
    };
    return directive;

    function template() {
        return [
            '<div class="page-footer">',
                '<div class="row">',
                    '<div class="col-xs-12 col-lg-6">',
                        '<div class="text-center">',
                            '<h2>Get in Touch</h2>',
                            '<p>We want to hear your questions or comments.</p>',
                        '</div>',
                        '<div class="text-center">',
                            '<a href="contactus">Contact Us</a>',
                        '</div>',
                    '</div>',
                    '<div class="col-xs-12 col-lg-6">',
                        '<div class="text-center">',
                            '<h2>Join the Community</h2>',
                            '<p>Keep up-to-date with our latest products.</p>',
                        '</div>',
                        '<div class="social text-center">',
                            '<a target="_blank" href="//twitter.com/nviofficial"><i class="fab fa-twitter"></i></a>',
                            '<a target="_blank" href="//www.facebook.com/nationalvisioninc"><i class="fab fa-facebook"></i></a>',
                            '<a target="_blank" href="//www.linkedin.com/company/national-vision-inc."><i class="fab fa-linkedin"></i></a>',
                            '<a target="_blank" href="//www.youtube.com/user/NationalVisionInc"><i class="fab fa-youtube-square"></i></a>',
                            '<a target="_blank" href="http://blog.nationalvision.com"><i class="fa fa-blog"></i></a>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="row">',
                    '<div class="col-xs-12">',
                        '<nav class="navbar">',
                        '<h2 class="text-center visible-xs">My Account</h2>',
                        '<ul>',
                        '<li id="451qa_user_link" ng-show="user.Permissions.contains(\'ViewSelfAdmin\')" class="admin">',
                        '<a href="admin">',
                        '{{\'User Information\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li class="order" ng-if="user.Type == \'Customer\'" ng-class="{\'active\': isActive(\'order\'), \'active-xs\': isActive(\'favoriteorders\')}">',
                        '<a id="451qa_order_link" href="order">',
                        '{{\'Orders\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li id="451qa_addy_link" ng-show="user.Type == \'Customer\' && (user.Permissions.contains(\'CreateShipToAddress\') || user.Permissions.contains(\'CreateBillToAddress\'))" class="addresses">',
                        '<a href="addresses">',
                        '{{\'Addresses\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li id="451qa_mesg_link" ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'ViewMessaging\')" class="messages">',
                        '<a href="message">',
                        '{{\'Messages\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li class="favorites" ng-show="user.Type == \'Customer\'">',
                        '<a id="451qa_fave_link" href="favoriteorders">',
                        '{{\'Favorites\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li class="report" ng-if="user.Type == \'Customer\' && user.Permissions.contains(\'AdvancedReporting\')" ng-class="{\'active\': isActive(\'reports\')}">',
                        '<a id="451qa_report_link" href="reports">',
                        '<span class="">{{\'Reports\' | r | xlat}}</span>',
                        '</a>',
                        '</li>',
                        '</ul>',
                        '</nav>',
                    '</div>',
                '</div>',
                '<div class="row">',
                    '<div class="col-xs-12 copyright text-center">',
                        '&copy; {{year}} {{user.Company.Name}}. All Rights Reserved.',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
    }
}

PageFooterCtrl.$inject = ['$scope', '$location'];
function PageFooterCtrl($scope, $location) {

    var d = new Date();
    $scope.year = d.getFullYear();

    /*below functions from NavCtrl.js in case navigation is used in the footer*/
    $scope.isActive = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if (path instanceof Array) {
            angular.forEach(path, function(p) {
                if (p == cur_path && !result)
                    result = true;
            });
        }
        else {
            if (cur_path == path)
                result = true;
        }
        return result;
    };

    //extension of above isActive in path
    $scope.isInPath = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if(cur_path.indexOf(path) > -1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
}