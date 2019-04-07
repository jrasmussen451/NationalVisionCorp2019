angular.module('OrderCloud-CustomKitForm', []);

angular.module('OrderCloud-CustomKitForm')
    .directive('customkitform', customkitform)
    .controller('CustomKitCtrl', CustomKitCtrl)
;

function customkitform() {
    var directive = {
        restrict: 'E',
        scope:{
            kititem:'=',
            user:'='
        },
        template: template,
        controller: CustomKitCtrl
    };
    return directive;

    function template() {
        return [
            '<div>',
            '<span>{{"(" + (kititem.Product.InteropID | r) + ") - " + (kititem.Product.Name | r) + ":" | xlat}}</span>',
            '<input class="kit-form-control pull-right" type="text" ng-model="kititem.Quantity"></input>',
            '</div>'
        ].join('');
    }
}

CustomKitCtrl.$inject = ['$scope', 'CustomKitDisplayService' , 'Order', 'Variant', 'User',];
function CustomKitCtrl($scope, CustomKitDisplayService, Order, Variant, User) {
    CustomKitDisplayService.getProductAndVariant($scope.kititem.Kit, null, function (data) {
        $scope.kititem.Product = data.product;
        CustomKitDisplayService.setNewLineItemScope($scope);
        CustomKitDisplayService.setProductViewScope($scope);
    }, 1, 100, null);
}