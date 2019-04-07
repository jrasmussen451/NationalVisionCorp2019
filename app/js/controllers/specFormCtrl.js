four51.app.controller('SpecFormCtrl', ['$scope', '$location', '$route', '$routeParams', '$window', 'ProductDisplayService', 'Variant', 'User', 'Resources', 'BuyerResources',
    function ($scope, $location, $route, $routeParams, $window, ProductDisplayService, Variant, User, Resources, BuyerResources) {

        /*custom*/
        $scope.addresses = BuyerResources.addresses;
        /*custom*/

        $scope.variantErrors = [];
        var varID = $routeParams.variantInteropID == 'new' ? null :  $routeParams.variantInteropID;
        $scope.loadingImage = true;
        ProductDisplayService.getProductAndVariant($routeParams.productInteropID, varID, function(data){
            $scope.Product = data.product;
            if(varID) {
                $scope.Variant = data.variant;
            }
            else {
                $scope.Variant = {};
                $scope.Variant.ProductInteropID = $scope.Product.InteropID;
                $scope.Variant.Specs = {};
                angular.forEach($scope.Product.Specs, function(item){
                    if(!item.CanSetForLineItem)
                    {
                        $scope.Variant.Specs[item.Name] = item;
                    }
                });
            }
            $scope.PID = $scope.Product.ExternalID;
            setSpecs();
            populateData();
        });

        function setSpecs() {
            $scope.userDetails = {};
            $scope.userDetails.Name = $scope.user.FirstName + ' ' + $scope.user.LastName;

            //if ($scope.PID === 'AB-BCM') { //og Jen 033119
            if ($scope.PID === 'AB-BCM' || $scope.PID=== 'AB-BCM-NJ' || $scope.PID=== 'EGW-BCM') {
                $scope.userDetails.managerTitle = "General Manager";
            }
            else {
                $scope.userDetails.managerTitle = "Manager";
            }
            angular.forEach($scope.user.Groups, function (group) {
                $scope.userDetails.Store = group.Name;
            });

            //$scope.UseAbbrTitle = ["AB-DOC Rx pads", "AB-DOC TPA pads", "AB-DREX-Rx pads", "AB-DREX-TPA pads"]; //og Jen 033119
            $scope.UseAbbrTitle = ["AB-DOC Rx pads", "AB-DOC TPA pads", "AB-DREX-RX_PADS", "AB-DREX-TPA pads", "EGW EOD RX PAD", "AB-WA-Rx Pads", "AB-WA-TPA Pads", "FM-WA-TPA Pads", "NJ Rx Pads", "WA-Rx Pads", "NJ TPA Pads", "NJ_Blank_Pads", "TN_FLYERS"];

            angular.forEach($scope.addresses, function (address) {
                if ($scope.userDetails.Store == address.Store) {
                    if ($scope.UseAbbrTitle.indexOf($scope.PID) > -1) {
                        $scope.userDetails.doctorAbbrTitle = address.AbbrTitle;
                        $scope.userDetails.RxPadStores = address.RxPadStores;
                    }
                    if ($scope.UseAbbrTitle.indexOf($scope.PID) <= -1) {
                        $scope.userDetails.doctorTitle = address.Title;
                    }

                    //merged from override Jen 033119
                    var padStores = ["WM-DREX Rx Pad", "FM-WA-Rx Pads", "AB-DREX-TPA pads-SC", "EGW LEASED RX PADS"];
                    if(padStores.indexOf($scope.PID) > -1){
                        $scope.userDetails.RxPadStores = address.RxPadStores;
                    }
                    //

                    $scope.userDetails.Drex = address.Drex;

                    /*these are the two variables that vary depending on whether product needs to show Center*/
                    $scope.userDetails.Address = address.Center;
                    $scope.userDetails.Address2 = address.Address;
                    /*these are the two variables that vary depending on whether product needs to show Center*/

                    $scope.userDetails.City = address.City;
                    $scope.userDetails.State = address.State;
                    $scope.userDetails.Zip = address.ZIP;
                    $scope.userDetails.Zip4 = address.ZIP4;
                    $scope.userDetails.Phone = address.Phone;
                    $scope.userDetails.Fax = address.Fax;
                    $scope.userDetails.Email = address.Email;
                }
            });
        }

        function populateData() {
            if ($scope.Variant && $scope.Variant.Specs) {
                if ($scope.Variant.Specs.Store && $scope.userDetails.Store) {
                    $scope.Variant.Specs.Store.Value = $scope.userDetails.Store;
                }
                if ($scope.Variant.Specs.Title) {
                    if ($scope.UseAbbrTitle.indexOf($scope.PID) > -1) {
                        $scope.Variant.Specs.Title.Value = $scope.userDetails.doctorAbbrTitle;
                    }
                    if ($scope.UseAbbrTitle.indexOf($scope.PID) <= -1) {
                        $scope.Variant.Specs.Title.Value = $scope.userDetails.doctorTitle;
                    }
                    //$scope.ReadOnly = ["AB-BCD", "AB-BCDapptex", "AB-BCDex", "EGW-BCD", "WM-BCD", "WM-BCED", "AB-DOC Rx pads", "AB-DOC TPA pads", "AB-DREX-Rx pads", "AB-DREX-TPA pads"]; //og Jen 03319
                    $scope.ReadOnly = ["AB-BCD", "AB-BCDapptex", "AB-BCDex", "EGW-BCD", "WM-BCD", "WM-BCED", "AB-DOC Rx pads", "AB-DOC TPA pads", "AB-DREX-RX_PADS", "AB-DREX-TPA pads", "AB-DREX-TPA pads-SC", "EGW EOD RX PAD", "EGW DREX RX PAD", "AB-BCDex-NJ", "WM-BCD-NJ", "WM-BCED-NJ", "WM-DREX Rx Pad", "WM-DREX TPA", "EGW DREX RX PAD", "EGW LEASED TPA", "EGW EOD TPA PAD", "WM-GEN TPA", "FreeTypePHFX-TPA Pad", "FM-MIL TPA PADS", "EGW-DREX TPA", "WM-DREX Rx Pad"];
                    if ($scope.ReadOnly.indexOf($scope.PID) > -1) {
                        $scope.Variant.Specs.Title.ReadOnly = true; //og Jen 033119
                        //$scope.Variant.Specs.Title.ReadOnly = false; //not sure this is correct doesnt match PROD for AB-BCDapptex?

                    }
                }
                if ($scope.Variant.Specs.Title && $scope.userDetails.managerTitle) {
                    //$scope.ReadOnly = ["AB-BCM", "EGW-BCM", "FM-BCM", "FM-I-BCM", "MIL-BCM", "WM-BCM"]; //og Jen 03319
                    $scope.ReadOnly = ["AB-BCM", "EGW-BCM", "FM-BCM", "FM-I-BCM", "MIL-BCM", "WM-BCM", "AB-BCM-NJ", "WM-BCM-NJ", "MIL-BCM-NJ"];
                    if ($scope.ReadOnly.indexOf($scope.PID) > -1) {
                        $scope.Variant.Specs.Title.Value = $scope.userDetails.managerTitle;
                        $scope.Variant.Specs.Title.ReadOnly = true;
                    }
                }
                if ($scope.Variant.Specs.Store && $scope.userDetails.Store) {
                    $scope.Variant.Specs.Store.Value = $scope.userDetails.Store;
                    if ($scope.userDetails.Store) { $scope.Variant.Specs.Store.ReadOnly = true; }
                }

                if ($scope.userDetails.RxPadStores) {

                    var stores = $scope.userDetails.RxPadStores;
                    stores = stores.split(",");
                    $scope.userDetails.stores = stores;

                    $scope.userDetails.authPadAddresses = [];
                    angular.forEach($scope.userDetails.stores, function (store) {
                        angular.forEach($scope.addresses, function (address) {
                            if (store == address.Store) {
                                $scope.userDetails.authPadAddresses.push(address);
                            }
                        });
                    });

                    var counter = 1;
                    angular.forEach($scope.userDetails.authPadAddresses, function (authAddress) {
                        var curBacker = 'BackerAddress' + counter;
                        var curAddress = authAddress;
                        $scope.Variant.Specs[curBacker].Value = curAddress.Address + ", " + curAddress.City + ", " + curAddress.State + ", " + curAddress.ZIP + " " + curAddress.Phone + " Fax: " + curAddress.Fax;
                        counter++;
                    });
                }

                /*AB-BCS is the only one that uses StoreNumber*/
                if ($scope.Variant.Specs.StoreNumber && $scope.userDetails.Store) {
                    $scope.Variant.Specs.StoreNumber.Value = $scope.userDetails.Store;
                    if ($scope.userDetails.Store) $scope.Variant.Specs.StoreNumber.ReadOnly = true;
                }
                if ($scope.Variant.Specs.Drex && $scope.userDetails.Drex) {
                    $scope.Variant.Specs.Drex.Value = $scope.userDetails.Drex;
                    if ($scope.userDetails.Drex) $scope.Variant.Specs.Drex.ReadOnly = true;
                }

                /*conditionals for whether a product has Address 2 - if it does then Center goes in Address / Address1 - if it doesnt Address goes in Address / Address1*/
                if (($scope.Variant.Specs.Address && !$scope.Variant.Specs.Address2) && $scope.userDetails.Address2) {
                    $scope.Variant.Specs.Address.Value = $scope.userDetails.Address2;
                    if ($scope.userDetails.Address2) $scope.Variant.Specs.Address.ReadOnly = true;
                }
                if (($scope.Variant.Specs.Address1 && !$scope.Variant.Specs.Address2) && $scope.userDetails.Address2) {
                    $scope.Variant.Specs.Address1.Value = $scope.userDetails.Address2;
                    if ($scope.userDetails.Address2) $scope.Variant.Specs.Address1.ReadOnly = true;
                }
                if (($scope.Variant.Specs.Address && $scope.Variant.Specs.Address2) && $scope.userDetails.Address2) {
                    $scope.Variant.Specs.Address.Value = $scope.userDetails.Address;
                    $scope.Variant.Specs.Address2.Value = $scope.userDetails.Address2;
                    if ($scope.userDetails.Address) $scope.Variant.Specs.Address.ReadOnly = true;
                    if ($scope.userDetails.Address2) $scope.Variant.Specs.Address2.ReadOnly = true;
                }
                if (($scope.Variant.Specs.Address1 && $scope.Variant.Specs.Address2) && $scope.userDetails.Address2) {
                    $scope.Variant.Specs.Address1.Value = $scope.userDetails.Address;
                    $scope.Variant.Specs.Address2.Value = $scope.userDetails.Address2;
                    if ($scope.userDetails.Address) $scope.Variant.Specs.Address1.ReadOnly = true;
                    if ($scope.userDetails.Address2) $scope.Variant.Specs.Address2.ReadOnly = true;
                }
                /*conditionals for whether a product has Address 2 - if it does then Center goes in Address / Address1 - if it doesnt Address goes in Address / Address1*/


                if ($scope.Variant.Specs.City && $scope.userDetails.City) {
                    $scope.Variant.Specs.City.Value = $scope.userDetails.City;
                    if ($scope.userDetails.City) $scope.Variant.Specs.City.ReadOnly = true;
                }
                if ($scope.Variant.Specs.State && $scope.userDetails.State) {
                    $scope.Variant.Specs.State.Value = $scope.userDetails.State;
                    if ($scope.userDetails.State) $scope.Variant.Specs.State.ReadOnly = true;
                }
                /*if the variable spec name is Zip*/
                if ($scope.Variant.Specs.Zip && $scope.userDetails.Zip) {
                    $scope.Variant.Specs.Zip.Value = $scope.userDetails.Zip + ' ';
                    if ($scope.userDetails.Zip) $scope.Variant.Specs.Zip.ReadOnly = true;
                }
                /*if the variable spec name is ZipCode*/
                if ($scope.Variant.Specs.ZipCode && $scope.userDetails.Zip) {
                    $scope.Variant.Specs.ZipCode.Value = $scope.userDetails.Zip + ' ';
                    if ($scope.userDetails.Zip) $scope.Variant.Specs.ZipCode.ReadOnly = true;
                }
                /*if there is variable spec of Zip4 - as of 012816 no Zip4's
                 if ($scope.Variant.Specs.Zip4 && $scope.userDetails.Zip4) {
                 $scope.Variant.Specs.Zip4.Value = $scope.userDetails.Zip4;
                 if ($scope.userDetails.Zip4) $scope.Variant.Specs.Zip4.ReadOnly = true;
                 } */
                if ($scope.Variant.Specs.Phone && $scope.userDetails.Phone) {
                    $scope.Variant.Specs.Phone.Value = $scope.userDetails.Phone;
                    if ($scope.userDetails.Phone) $scope.Variant.Specs.Phone.ReadOnly = true;
                }
                if ($scope.Variant.Specs.Fax && $scope.userDetails.Fax) {
                    $scope.Variant.Specs.Fax.Value = $scope.userDetails.Fax;
                    if ($scope.userDetails.Fax) $scope.Variant.Specs.Fax.ReadOnly = true;
                }
                if ($scope.Variant.Specs.Email && $scope.userDetails.Email) {
                    $scope.Variant.Specs.Email.Value = $scope.userDetails.Email;
                    if ($scope.userDetails.Email) $scope.Variant.Specs.Email.ReadOnly = true;
                }
            }
        }

        function validateVariant(){
            if(!$scope.Variant) return;
            var newErrors = [];
            angular.forEach($scope.Variant.Specs, function(s){
                if(s.Required && !s.Value)
                    newErrors.push(s.Label || s.Name + ' is a required field');
            });
            $scope.variantErrors = newErrors;
        }

        $scope.$watch('Variant.Specs', function(o, n){
            validateVariant();
        }, true);
        function saveVariant(variant, saveNew, hideErrorAlert /*for compatibility*/) {
            if($scope.variantErrors.length){
                $scope.showVariantErrors = true;
                if(!hideErrorAlert)
                    $window.alert("please fill in all required fields");
                //the default spec form should be made to deal with showing $scope.variantErrors, but it's likely existing spec forms may not deal with $scope.variantErrors
                return;
            }
            if(saveNew) $scope.Variant.InteropID = null;
            Variant.save(variant, function(data){
                $location.path('/product/' + $scope.Product.InteropID + '/'+ data.InteropID);
            });
        }
        $scope.save = function(hideErrorWindowAlert){
            saveVariant($scope.Variant, false, hideErrorWindowAlert);
        }

        $scope.saveasnew = function(hideErrorAlert) {
            saveVariant($scope.Variant, true, hideErrorAlert);
        }

        $scope.$on('event:imageLoaded', function(event, result) {
            $scope.loadingImage = !result;
            $scope.$apply();
        });
    }]);