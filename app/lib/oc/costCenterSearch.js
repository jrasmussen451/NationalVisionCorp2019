angular.module('OrderCloud-CostCenterSearch', []);

angular.module('OrderCloud-CostCenterSearch')
    .directive('costcentersearch', costcentersearch)
    .controller('CostCenterSearchCtrl', CostCenterSearchCtrl)
;

function costcentersearch() {
    var directive = {
        restrict: 'E',
        controller: 'CostCenterSearchCtrl',
        template: template
    };
    return directive;

    function template() {
        return [
            '<style>',
            '.costcenterlist .dropdown-menu  { background-color:#fff;}',
            '.costcenterlist .dropdown-menu .active > a {background-color:#000 !important; color:#fff;}',
            '.count {float;left; color:#000; position:relative;left: 10px; margin:0; padding:0;}',
            '</style>',
            '<div class="row costcenterlist view-form-icon">',
            '<div class="col-xs-12">',
            '<label class="required">{{\'Billing Cost Center\' | r | xlat}}',
            '<span class="count" ng-show="showTip">( Start typing to find your cost center )</span>',
            '<span class="count" ng-show="showResult">No cost center found!</span>',
            '</label>',
            '<div class="form-group">',
            '<input class="form-control" type="text" ng-readonly="readonlyshipping" ng-model="CostCenter" required ng-change="searchCostCenters(CostCenter)" typeahead-min-length="2" typeahead="costcenter as (costcenter.Name) for costcenter in returnedcostcenters | filter:$viewValue | limitTo:10" />',
            '<i class="fa fa-map-marker"></i>',
            '<input class="form-control" type="hidden" ng-model="currentOrder.CostCenter" required />',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

CostCenterSearchCtrl.$inject = ['$scope'];
function CostCenterSearchCtrl($scope) {

    $scope.returnedcostcenters = [$scope.user.CostCenters];

    $scope.shipAddressCount = null;
    $scope.showTip = true;
    $scope.showResult = false;

    $scope.$watch('CostCenter', function(newValue) {
        if (!newValue || !newValue.ID) {
            $scope.currentOrder.CostCenter = null;
            $scope.showTip = true;
            $scope.showResult = false;
        }
        else {
            $scope.currentOrder.CostCenter = newValue.Name;
        }
    });

    $scope.searchCostCenters = function(searchTerm) {
        $scope.returnedcostcenters = [' '];
        if (searchTerm) {
            var tempCostCenters = [];
            var count = 0;
            angular.forEach($scope.user.CostCenters, function(center){
                if(center.Name.search(searchTerm) != -1){
                    tempCostCenters.push(center);
                    count++;
                }
            });

            $scope.returnedcostcenters = tempCostCenters;

            if (count === 0) {
                $scope.showTip = false;
                $scope.showResult = true;
            }
            else {
                $scope.showTip = true;
                $scope.showResult = false;
            }
        }
    };
}