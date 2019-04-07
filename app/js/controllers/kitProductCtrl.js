four51.app.controller('KitProductCtrl', ['$routeParams', '$rootScope', '$scope', '$location', 'Product', 'Resources', 'ProductDisplayService' , 'Order', 'Variant', 'User',
    function ($routeParams,$rootScope, $scope, $location, Product, Resources, ProductDisplayService, Order, Variant, User) {
        var kitOperationsList = Resources.kitOperationsMasterList;
        var kitMarketingList = Resources.kitMarketingMasterList;

        $scope.$watch('LineItem.Product',function(product){
            if(!product)return;
            $scope.kitOperationsItems = [];
            $scope.kitMarketingItems = [];

            angular.forEach(kitOperationsList, function(item){
                var kitItem = {};
                kitItem.Kit = item.ProdID;
                if(item[$scope.LineItem.Product.InteropID] != null){
                    kitItem.Quantity = item[$scope.LineItem.Product.InteropID];
                }
                else{
                    kitItem.Quantity = 0;
                }
                if(kitItem.Quantity > 0){
                    $scope.kitOperationsItems.push(kitItem);
                }
            });

            angular.forEach(kitMarketingList, function(item){
                var kitItem = {};
                kitItem.Kit = item.ProdID;
                if(item[$scope.LineItem.Product.InteropID] != null){
                    kitItem.Quantity = item[$scope.LineItem.Product.InteropID];
                }
                else{
                    kitItem.Quantity = 0;
                }
                if(kitItem.Quantity > 0){
                    $scope.kitMarketingItems.push(kitItem);
                }
            });
        });

        $scope.addKitToOrder = function(){
            if($scope.lineItemErrors && $scope.lineItemErrors.length){
                $scope.showAddToCartErrors = true;
                return;
            }
            if(!$scope.currentOrder){
                $scope.currentOrder = { };
                $scope.currentOrder.LineItems = [];
            }
            if (!$scope.currentOrder.LineItems){
                $scope.currentOrder.LineItems = [];
            }
            if($scope.kitOperationsItems){
                angular.forEach($scope.kitOperationsItems, function(item){
                    if(item.Quantity > 0){
                        if(item.PriceSchedule){
                            $scope.currentOrder.LineItems.push(item);
                        }
                        else{
                            console.log("Item " + item.Kit + " is missing a price schedule");
                        }
                    }
                });
            }
            if($scope.kitMarketingItems){
                angular.forEach($scope.kitMarketingItems, function(item){
                    if(item.Quantity > 0){
                        if(item.PriceSchedule){
                            $scope.currentOrder.LineItems.push(item);
                        }
                        else{
                            console.log("Item " + item.Kit + " is missing a price schedule");
                        }
                    }
                });
            }
            $scope.currentOrder.Type = 'Standard';
            $scope.addToOrderIndicator = true;
            //$scope.currentOrder.Type = (!$scope.LineItem.Product.IsVariantLevelInventory && $scope.variantLineItems) ? $scope.variantLineItems[$scope.LineItem.Product.Variants[0].InteropID].PriceSchedule.OrderType : $scope.LineItem.PriceSchedule.OrderType;
            // shipper rates are not recalcuated when a line item is added. clearing out the shipper to force new selection, like 1.0
            Order.clearshipping($scope.currentOrder).
            save($scope.currentOrder,
                function(o){
                    $scope.user.CurrentOrderID = o.ID;
                    User.save($scope.user, function(){
                        $scope.addToOrderIndicator = true;
                        $location.path('/cart' + ($scope.isEditforApproval ? '/' + o.ID : ''));
                    });
                },
                function(ex) {
                    $scope.addToOrderIndicator = false;
                    $scope.lineItemErrors.push(ex.Detail);
                    $scope.showAddToCartErrors = true;
                    //$route.reload();
                }
            );
        };
    }]);