angular.module('OrderCloud-CategorySidebar', []);
angular.module('OrderCloud-CategorySidebar')
    .directive('categorysidebar', categorysidebar)
    .controller('CategorySidebarCtrl', CategorySidebarCtrl)
;

function categorysidebar() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'CategorySidebarCtrl'
    };
    return directive;

    function template() {
        return [
            '<ul>',
            '<li ng-repeat="category in modaltree">',
            '<a ng-click="retarget(\'catalog/{{category.InteropID}}\')" ng-bind-html="category.Name"></a>',
            '<ul ng-if="category.SubCategories.length > 0">',
            '<li ng-repeat="sub in category.SubCategories">',
            '<a ng-click="retarget(\'catalog/{{sub.InteropID}}\')" ng-bind-html="sub.Name"></a>',
            '</li>',
            '</ul>'
        ].join('');
    }
}

CategorySidebarCtrl.$inject = ['$scope', '$modal', '$log'];
function CategorySidebarCtrl($scope, $modal, $log) {

    $scope.modaltree = $scope.tree;
    $scope.animationsEnabled = true;

    $scope.openCategory = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            size: size,
            template: categorymodalopen,
            controller: CategoryModalOpenCtrl,
            resolve: {
                modaltree: function () {
                    //pass a scope variable into the modal content. in this case we are providing the category tree
                    return $scope.tree;
                }
            }
        });

        function categorymodalopen() {
            return [
                '<div class="modal-header">',
                '<h5 class="modal-title text-primary">SELECT A CATEGORY</h5>',
                '<a class="pull-right close" ng-click="closeCategory()">',
                '<i class="fa fa-times"></i>',
                '</a>',
                '</div>',
                '<div class="modal-body">',
                    //modaltree
                    '<ul>',
                        '<li ng-repeat="category in modaltree">',
                            '<a ng-click="retarget(\'catalog/{{category.InteropID}}\')" ng-bind-html="category.Name"></a>',
                            '<ul ng-if="category.SubCategories.length > 0">',
                                '<li ng-repeat="sub in category.SubCategories">',
                                    '<a ng-click="retarget(\'catalog/{{sub.InteropID}}\')" ng-bind-html="sub.Name"></a>',
                '{{category.SubCategories.SubCategories}}',
                                    '<ul ng-show="sub.SubCategories.length > 0">',
                                    '<li ng-repeat="test in sub.SubCategories">',
                                    '<a ng-click="retarget(\'catalog/{{test.InteropID}}\')" ng-bind-html="test.Name"></a>',
                                    '</li>',
                                    '</ul>',
                                '</li>',
                            '</ul>',
                        '</li>',
                    '</ul>',
                '</div>'
            ].join('');
        }

        modalInstance.result.then(function (currentCategory) {
            $scope.current = currentCategory;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    };

    var CategoryModalOpenCtrl = ['$scope', '$location', '$modalInstance', '$modal', 'modaltree', function($scope, $location, $modalInstance, $modal, modaltree) {

        $scope.modaltree = modaltree; // this is the item passed in from the CategoryModalCtrl resolve

        $scope.retarget = function(url) {
            $scope.target = url;
            $location.path($scope.target);
            $modalInstance.close();
        };

        $scope.closeCategory = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }];

}