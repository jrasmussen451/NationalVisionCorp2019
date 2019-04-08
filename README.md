#### NationalVisionCorp2019
##### Vendor: Supply Logic
##### PM: Luke Paschka, Supply Logic
##### Developer: Jen Rasmussen, Independent

##### Github URL
* https://github.com/jrasmussen451/NationalVisionCorp2019

##### Converter URL
* http://www.four51.com/Themes/Custom/78ad1fd0-1ab1-4bd2-9a1a-a556f7bc77dc/NationalVisionConverter/index.html

#### Merged files from NationalVision repository
* js/controllers/contactUsCtrl.js
* js/services/analyticsService.js
* js/services/buyerResourceServices.js
* js/services/emailService.js
* js/services/logoService.js
* lib/mandrill.js
* product-detail-template.html (this is just a backup of the og code just in case)

#### Non-merged files from NationalVision repository
* js/directives/productSearchInput.js (lib/oc)
* app/lib/angular/plugins/ordercloudspecforms.js (lib/oc)

#### Additional Updates

##### Controllers
* addressListCtrl.js - change in scope.checkAll (36-37)
* approvalInputCtrl.js - inclusion of Address (1-29)
* cartCtrl.js - includes Punchout (1-25)
* categoryCtrl.js - navStatus (29-31, 38-40) - commented out, breaks and we probably don't need
* checkOutViewCtrl.js - Custom Order Field (19-41) | analytics (49-51)
* Four51Ctrl.js - adds Punchout

##### Directives
* addToOrderSpecs.js
* alertShow.js
* customFileField.js
* customTextField.js
* nav.js
* orderBilling.js
* orderDetails.js
* orderShipping.js
* orderSummary.js
* paymentSelection.js

##### Views
###### Controls
* addressInput.html - adds address shipping for save 
* approvalInput.html 
- line 6 adds disabled if "approveClicked" 
- commented out, this is where we get the bug listed below for Spec Form Control

- adds required class to label
* customCheckBoxField.html
* customDateField.html
* customPhoneField.html
* customTextField.html
* customTimeField.html

* fileUpload.html

* login.html - merged in override
* nav.html - new per new design

* orderBilling.html
* orderDetails.html

* orderShipping.html
- !! update for filter on UPS Ground??

* orderSummary.html
- adds security modal 
- current redirects to /security but there is no partial for security, check routing!!

* shortProductView.html
- added PW-14681 Add To Order From  Product List Page?? 

- adds Kit logic
* shortProductViewGallery.html
* shortProductViewInline.html
* shortProductViewMinimal.html

###### Messages
* contactus.html
* home.html

###### Reporting
* lineItemHistoryGridView.html 
- adds in Proof / Production URL logic

* orderHistoryDetailsView.html
- adds in Ship / Bill Company Name

###### Other
* addressListView.html
- should addresses be filtered by if they are customer editable? (27)

* branding.html
- reset to default / not in use

* copyrightView.html
- powered by SupplyLogic (6-7)

* favoriteOrderListView.html
* messageListView.html
* messageView.html
* orderPrintView.html
- adds in Payment Method undetermined

* orderDetails.html
- hide custom order field if NVISupplierShipDay (45-57)

* orderSearchView.html
- pagination is commented out (144-147)

* orderShipping.html
- filter ship method UPS Ground (56, 139)

* userView.html
- ViewSelfAmin permissions is commented out (11-13)

* index.html
- favicons (9-10)
- adds lib/oc (118-137)
- comment out tree.js (239)

##### Services
* navService.js
* orderConfigService.js
* orderService.js
* productDisplayService.js
- merged in override, contains 'scope.pdfviewed = "veiwed"' (164)
* productService.js
* securityService.js
* XLATTables.js
* config/js
* routing/js 

#### Logos based on user group (Example User Group Store #s)

* National Vision (none) - this is too tall on mobile
* AC Lens (??) per luke, ok to ignore 
* americas-best (5101)
* eyeglass-world (8201) - this is too tall on mobile
* walmart (140)
* fred-meyer (7603) - this is too tall on mobile
* military (6103)

#### Changing the navigation colors (background)
* .navbar-fixed
* .navbar-utility .dropdown-menu
* minicart .minicart-detail


#### Notes
* A default image is displayed on the category pages (in the code)
* If a category has a description, it needs removed (ex: Name Badges)
* The default image can be overridden on a category basic by using the category description to house an image
* ex: xxxx

#### Bugs
* Addresses
- Quick Address isn't working

* SpecForms
- review lines 100-101 for Title read only if set as false renders editable on test but not on prod for AB-BCDapptex

* ProductZoom
- cant get this work not sure why, created _TestZoom PDT with updated code
- https://github.com/Four51/CustomSolutions/blob/master/Product%20Zoom/README.md
