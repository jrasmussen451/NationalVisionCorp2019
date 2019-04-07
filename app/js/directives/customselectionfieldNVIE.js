four51.app.directive('customselectionfieldnvie', ['$451', function($451) {
    var obj = {
        scope: {
            customfield : '=',
            change: '=',
            hidesuffix: '@',
            hideprefix: '@'
        },
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/controls/customSelectionFieldNVIE.html',
        link: function(scope) {
            scope.changed = function() {
                //reset values
                scope.customfield.isOtherSelected = false;
                angular.forEach(scope.customfield.Options, function(opt) {
                    opt.Selected = false;
                });
                // end reset
                scope.customfield.Value = this.item == null ? null : this.item.Value;
                scope.customfield.SelectedOptionID = this.item == null ? null : this.item.ID;
                if (this.item != null) this.item.Selected = true;

                if (this.item != null && this.item.Value.indexOf('Store # / Corp Dept #') > -1) {
                    scope.customfield.isOtherSelected = true;
                    this.item.Selected = true;
                    scope.customfield.SelectedOptionID = this.item.ID;
                    scope.customfield.Value = scope.other;
                }
                if (scope.change)
                    scope.change(scope.customfield);
            };
            scope.otherChanged = function() {
                scope.customfield.isOtherSelected = true;
                scope.customfield.Value = scope.other;
                if (scope.change)
                    scope.change(scope.customfield);
            };
            scope.item = {}, scope.other = ''; // initialize the item variable to avoid checking for null

            scope.init = function() {
                this.item = null;
            };
        }
    }
    return obj;
}]);