four51.app.directive('navigation', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/nav.html',
        controller: 'NavCtrl'
    };
    return obj;
});

four51.app.directive('accountnavigation', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/accountnav.html',
        controller: 'NavCtrl'
    };
    return obj;
});

four51.app.directive('backStep', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function () {
                history.back();
                scope.$apply();
            });
        }
    };
});


four51.app.directive('hamburgernav', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/hamburger-nav.html',
        controller: 'HamburgerNavCtrl'
    };
    return obj;
});


four51.app.directive('sidebarnavigation', function() {
    var obj = {
        restrict: 'E',
        templateUrl: 'partials/controls/sidebarNavigation.html',
        controller: 'SidebarNavigationCtrl'
    };
    return obj;
});