four51.app.controller('shortProductViewCtrl', ['$routeParams', '$scope', 'ProductDisplayService', 'Order', 'User', '$location', '$route',
	function ($routeParams, $scope, ProductDisplayService, Order, User, $location, $route) {
		$scope.LineItem = {};
		$scope.LineItem.Product = $scope.p;
		$scope.showAddToOrder = true;
		if($scope.LineItem.Product.InteropID.toLowerCase().indexOf("kit_") != -1){
			$scope.showAddToOrder = false;
		}
		ProductDisplayService.setNewLineItemScope($scope);
		ProductDisplayService.setProductViewScope($scope);
		/*PW-14681 Add to Order from Product List Page*/

		$scope.allowAddToOrderInProductList = $scope.allowAddToOrder && $scope.LineItem.Product.Type != 'VariableText' && $scope.LineItem.Product.SpecCount == 0;
		var _addToOrder = function(){
			$scope.displayLoadingIndicator = true;
			$scope.actionMessage = null;
			$scope.errorMessage = null;
			$scope.user.CurrentOrderID ? addLineItemToCurrentOrder() : addLineItemToNewOrder();
			$scope.displayLoadingIndicator = false;
		};
		$scope.addToOrder = function(){
			var confirmStr = "Item " + $scope.LineItem.Product.ExternalID + " is backordered. Any orders placed for these items will ship as soon as it is back in stock. For more info please contact nvi@supplylogic.com"
			if($scope.LineItem.Product.InventoryEnabled){
				if(Number($scope.LineItem.Quantity) > $scope.LineItem.Product.QuantityAvailable){
					var confirmBackorder = confirm(confirmStr);
					if(confirmBackorder){
						_addToOrder();
					}
				}
				else{
					_addToOrder();
				}
			}
			else{
				_addToOrder();
			}
		};
		var addLineItemToCurrentOrder = function(){
			Order.get($scope.user.CurrentOrderID, function(order){
				addToOrderSave(order);
			});
		};
		var addLineItemToNewOrder = function(){
			var currentOrder = {};
			currentOrder.LineItems = [];
			addToOrderSave(currentOrder);
		};
		var addToOrderSave = function(currentOrder){
			currentOrder.LineItems.push($scope.LineItem);
			Order.save(currentOrder,
				function(order, callback){
					$scope.user.CurrentOrderID = order.ID;
					$scope.LineItem.Product.QuantityAvailable = $scope.LineItem.Product.QuantityAvailable - $scope.LineItem.Quantity;
					User.save($scope.user, function(){
						$scope.LineItem.Quantity = null;
					});
					if (callback) callback();
					$scope.actionMessage = 'Item has been added to your cart!';
				},
				function (ex) {
					$scope.displayLoadingIndicator = false;
					$scope.errorMessage = ex.Message;
				}
			);
		};
		/*PW-14681 Add to Order from Product List Page*/
	}]);