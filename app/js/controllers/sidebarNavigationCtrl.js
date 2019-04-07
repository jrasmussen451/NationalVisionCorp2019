four51.app.controller('SidebarNavigationCtrl', ['$location', '$route', '$scope', '$451', 'User',
    function ($location, $route, $scope, $451, User) {
        $('ul').click('a', function() {
            $('.collapse').collapse('hide');
        });
    }]);