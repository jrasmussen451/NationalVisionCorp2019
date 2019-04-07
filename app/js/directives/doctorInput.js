//Doctor AutoFill

four51.app.directive('doctorsbystore', ['$http', function($http) {
    return {
        template: '<select class="form-control" ng-change="updateVari()" ng-model="selectedDoctor" ng-options="d.FullName for d in doctors"></select>',
        restrict: 'E',
        scope: {
        },
        link:function(scope,elm,attrs){
            scope.updateVari = function() {
                var vm = scope.$parent;
                var d = scope.selectedDoctor;
                if (!vm.Variant) return;
                if (vm.Variant.Specs.Name && d.FullName) {
                    vm.Variant.Specs.Name.Value = d.FullName;
                    vm.Variant.Specs.Name.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Name) {
                    vm.Variant.Specs.Name.Value = '';
                    vm.Variant.Specs.Name.ReadOnly = false;
                }
                if (vm.Variant.Specs.Credentials && d.Credentials) {
                    vm.Variant.Specs.Credentials.Value = d.Credentials;
                    vm.Variant.Specs.Credentials.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Name) {
                    vm.Variant.Specs.Credentials.Value = '';
                    vm.Variant.Specs.Credentials.ReadOnly = false;
                }
                if (vm.Variant.Specs.Title && d.Title) {
                    vm.Variant.Specs.Title.Value = d.Title;
                    vm.Variant.Specs.Title.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Title) {
                    vm.Variant.Specs.Title.Value = '';
                    vm.Variant.Specs.Title.ReadOnly = false;
                }
                if (vm.Variant.Specs.Drex && d.DREX) {
                    vm.Variant.Specs.Drex.Value = d.DREX;
                    vm.Variant.Specs.Drex.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Drex) {
                    vm.Variant.Specs.Drex.Value = '';
                    vm.Variant.Specs.Drex.ReadOnly = false;
                }
                if (vm.Variant.Specs.Address && d.Address) {
                    vm.Variant.Specs.Address.Value = d.Address;
                    vm.Variant.Specs.Address.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Address) {
                    vm.Variant.Specs.Address.Value = '';
                    vm.Variant.Specs.Address.ReadOnly = false;
                }
                if (vm.Variant.Specs.Address1 && d.Center) {
                    vm.Variant.Specs.Address1.Value = d.Center;
                    vm.Variant.Specs.Address1.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Address1) {
                    vm.Variant.Specs.Address1.Value = '';
                    vm.Variant.Specs.Address1.ReadOnly = false;
                }
                if (vm.Variant.Specs.Address2 && d.Address) {
                    vm.Variant.Specs.Address2.Value = d.Address;
                    vm.Variant.Specs.Address2.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Address2) {
                    vm.Variant.Specs.Address2.Value = '';
                    vm.Variant.Specs.Address2.ReadOnly = false;
                }
                if (vm.Variant.Specs.City && d.City) {
                    vm.Variant.Specs.City.Value = d.City;
                    vm.Variant.Specs.City.ReadOnly = true;
                }
                else if (vm.Variant.Specs.City) {
                    vm.Variant.Specs.City.Value = '';
                    vm.Variant.Specs.City.ReadOnly = false;
                }
                if (vm.Variant.Specs.State && d.State) {
                    vm.Variant.Specs.State.Value = d.State;
                    vm.Variant.Specs.State.ReadOnly = true;
                }
                else if (vm.Variant.Specs.State) {
                    vm.Variant.Specs.State.Value = '';
                    vm.Variant.Specs.State.ReadOnly = false;
                }
                if (vm.Variant.Specs.ZipCode && d.ZIP) {
                    vm.Variant.Specs.ZipCode.Value = d.ZIP;
                    vm.Variant.Specs.ZipCode.ReadOnly = true;
                }
                else if (vm.Variant.Specs.ZipCode) {
                    vm.Variant.Specs.ZipCode.Value = '';
                    vm.Variant.Specs.ZipCode.ReadOnly = false;
                }
                if (vm.Variant.Specs.Zip && d.ZIP) {
                    vm.Variant.Specs.Zip.Value = d.ZIP;
                    vm.Variant.Specs.Zip.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Zip) {
                    vm.Variant.Specs.Zip.Value = '';
                    vm.Variant.Specs.Zip.ReadOnly = false;
                }
                if (vm.Variant.Specs.Phone && d.Phone) {
                    vm.Variant.Specs.Phone.Value = d.Phone;
                    vm.Variant.Specs.Phone.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Phone) {
                    vm.Variant.Specs.Phone.Value = '';
                    vm.Variant.Specs.Phone.ReadOnly = false;
                }
                if (vm.Variant.Specs.Fax && d.Fax) {
                    vm.Variant.Specs.Fax.Value = d.Fax;
                    vm.Variant.Specs.Fax.ReadOnly = true;
                }
                else if (vm.Variant.Specs.Fax) {
                    vm.Variant.Specs.Fax.Value = '';
                    vm.Variant.Specs.Fax.ReadOnly = false;
                }
                if (vm.Variant.Specs.License && d.License) {
                    vm.Variant.Specs.License.Value = d.License;
                    vm.Variant.Specs.License.ReadOnly = true;
                }
                else if (vm.Variant.Specs.License) {
                    vm.Variant.Specs.License.Value = '';
                    vm.Variant.Specs.License.ReadOnly = false;
                }
                if (vm.Variant.Specs.Store && vm.Store) {
                    vm.Variant.Specs.Store.Value = vm.Store;
                    vm.Variant.Specs.Store.ReadOnly = true;
                }
            }

            angular.forEach(scope.$parent.user.Groups, function(g){
                if (isNaN(g.Name) == false) scope.addressGroup = g.Name;
            });
            $http.get('//nvi.prowebservicehost.com/api/nvi/' + scope.addressGroup)
                .then(function(response) {
                    console.log('success');
                    scope.doctors = response.data;

                    angular.forEach(scope.doctors, function(d, key) {
                        d.FullName = d.FName +' '+ d.LName;

                        if(d.MI !== null)
                            d.FullName = d.FName.trim() +' '+ d.MI.trim() +' '+ d.LName.trim();
                    });

                    scope.selectedDoctor=scope.doctors[1];
                    scope.updateVari();

                }, function(response){
                    /*scope.doctors = [
                     {
                     "License": "1250",
                     "NPID": "1568550093",
                     "DEA": "",
                     "FName": "JULIE",
                     "LName": "GERMER",
                     "MI": "R",
                     "StoreNumber": 5101,
                     "Entity": "Americas Best",
                     "DREX": "",
                     "Center": "Clocktower Village",
                     "Address": "717 N 98th Street",
                     "City": "Omaha",
                     "State": "NE",
                     "ZIP": "68114",
                     "ZIP4": "2340",
                     "Phone": "(402) 399-2000",
                     "Fax": "(402) 399-1725",
                     "Email": "5101@nationalvision.com"
                     },
                     {
                     "License": "1298",
                     "NPID": "1922140748",
                     "DEA": "",
                     "FName": "TRACEY",
                     "LName": "PAYNE",
                     "MI": "L",
                     "StoreNumber": 5101,
                     "Entity": "Americas Best",
                     "DREX": "",
                     "Center": "Clocktower Village",
                     "Address": "717 N 98th Street",
                     "City": "Omaha",
                     "State": "NE",
                     "ZIP": "68114",
                     "ZIP4": "2340",
                     "Phone": "(402) 399-2000",
                     "Fax": "(402) 399-1725",
                     "Email": "5101@nationalvision.com"
                     },
                     {
                     "License": "1131",
                     "NPID": "1306840111",
                     "DEA": "MT1373339",
                     "FName": "DOUGLAS",
                     "LName": "TASSI",
                     "MI": null,
                     "StoreNumber": 5101,
                     "Entity": "Americas Best",
                     "DREX": "",
                     "Center": "Clocktower Village",
                     "Address": "717 N 98th Street",
                     "City": "Omaha",
                     "State": "NE",
                     "ZIP": "68114",
                     "ZIP4": "2340",
                     "Phone": "(402) 399-2000",
                     "Fax": "(402) 399-1725",
                     "Email": "5101@nationalvision.com"
                     },
                     {
                     "License": "",
                     "NPID": "1740348911",
                     "DEA": "N/A",
                     "FName": "Lisa",
                     "LName": "Calvert",
                     "MI": "K",
                     "StoreNumber": 5101,
                     "Entity": "Americas Best",
                     "DREX": "",
                     "Center": "Clocktower Village",
                     "Address": "717 N 98th Street",
                     "City": "Omaha",
                     "State": "NE",
                     "ZIP": "68114",
                     "ZIP4": "2340",
                     "Phone": "(402) 399-2000",
                     "Fax": "(402) 399-1725",
                     "Email": "5101@nationalvision.com"
                     },
                     {
                     "License": "",
                     "NPID": "1770740532",
                     "DEA": "MZ0279059",
                     "FName": "ERIK",
                     "LName": "ZINGLER",
                     "MI": "B",
                     "StoreNumber": 5101,
                     "Entity": "Americas Best",
                     "DREX": "",
                     "Center": "Clocktower Village",
                     "Address": "717 N 98th Street",
                     "City": "Omaha",
                     "State": "NE",
                     "ZIP": "68114",
                     "ZIP4": "2340",
                     "Phone": "(402) 399-2000",
                     "Fax": "(402) 399-1725",
                     "Email": "5101@nationalvision.com"
                     },
                     {
                     "License": "",
                     "NPID": "1801951207",
                     "DEA": "",
                     "FName": "DAVID",
                     "LName": "LUBY",
                     "MI": "M",
                     "StoreNumber": 5101,
                     "Entity": "Americas Best",
                     "DREX": "",
                     "Center": "Clocktower Village",
                     "Address": "717 N 98th Street",
                     "City": "Omaha",
                     "State": "NE",
                     "ZIP": "68114",
                     "ZIP4": "2340",
                     "Phone": "(402) 399-2000",
                     "Fax": "(402) 399-1725",
                     "Email": "5101@nationalvision.com"
                     },
                     {
                     "License": "",
                     "NPID": "1568450427",
                     "DEA": "FT3449685",
                     "FName": "JADE",
                     "LName": "TEXCELL",
                     "MI": "N",
                     "StoreNumber": 5101,
                     "Entity": "Americas Best",
                     "DREX": "",
                     "Center": "Clocktower Village",
                     "Address": "717 N 98th Street",
                     "City": "Omaha",
                     "State": "NE",
                     "ZIP": "68114",
                     "ZIP4": "2340",
                     "Phone": "(402) 399-2000",
                     "Fax": "(402) 399-1725",
                     "Email": "5101@nationalvision.com"
                     }
                     ];
                     angular.forEach(scope.doctors, function(d, key) {
                     d.FullName = d.FName +' '+ d.LName;

                     if(d.MI !== null)
                     d.FullName = d.FName +' '+ d.MI +' '+ d.LName;
                     });
                     scope.selectedDoctor=scope.doctors[1];
                     scope.updateVari();*/

                    console.log(response);
                });

            scope.$on('VariantSpecsPresent', function(){
                scope.updateVari();
            });

        }
    };
}]);