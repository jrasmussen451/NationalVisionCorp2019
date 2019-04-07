four51.app.factory('User', ['$q', '$rootScope', '$resource', '$451', '$location', 'Security', 'Error', 'Resources', 'BuyerResources', function($q, $rootScope, $resource, $451, $location, Security, Error, Resources, BuyerResources) {
	var _cacheName = '451Cache.User.' + $451.apiName;
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function _extend(u) {
		u.Permissions.contains = function(value) {
			return $451.contains(u.Permissions, value);
		};
		if ($451.contains(u.Permissions, ['PayByVisa', 'PayByMasterCard', 'PayByAmex', 'PayByDiscover', 'PayByDinersClub', 'PayByJCB', 'PayByDelta', 'PayBySwitch', 'PayBySolo', 'PayByElectron', 'PayByLaser']))
			u.Permissions.push('PayByCreditCard');


		/*logo based on user group*/
		var addresses = BuyerResources.addresses;
		angular.forEach(u.Groups, function(group) {
			var name = group.Name;
			angular.forEach(addresses, function(address) {
				if (address.Store == name) {
					u.LogoName = address.Entity;
				}
			});
		});

		angular.forEach(u.CustomFields, function(f) {
			if (f.ControlType == 'File' && f.File && f.File.Url.indexOf('auth') == -1) {
				f.File.Url += "&auth=" + Security.auth();
			}
			if (u.LogoName && f.Name == (u.LogoName + '_logo')) {
				u.LogoURL = f.File.Url;
			}
		});
		u.Company.POIDMask = u.Company.POIDMask.toUpperCase();
		/*logo based on user group*/

		/*PW-15096 Custom Order Field*/
		u.Store = null;
		angular.forEach(u.Groups, function (group) {
			u.Store = group.Name;
		});

		var addresses = Resources.addresses;
		u.Entity = null;
		angular.forEach(addresses, function (address) {
			if (u.Store == address.Store) {
				u.Entity = address.Entity;
			}
		});
		/*PW-15096 Custom Order Field*/
	}

	var _refresh = function() {
		store.remove(_cacheName);
		_get();
	};

	var _get = function(success) {
		var user = store.get(_cacheName);
		user ? (function() { _extend(user); _then(success,user); })() :
			$resource($451.api('user')).get().$promise.then(function(u) {
				_extend(u);
				_then(success,u);
				store.set(_cacheName, u);
			});
	};

	var _save = function(user, success, error) {
		$resource($451.api('user')).save(user).$promise.then(
			function(u) {
				_extend(u);
				_then(success,u);
				store.set(_cacheName, u);
			},
			function(ex) {
				if (angular.isFunction(error))
					error(Error.format(ex));
			}
		);
	};

	var _login = function(credentials, success, error) {
		store.clear();
		$resource($451.api('login')).get(credentials).$promise.then(
			function(u) {
				/**/
				if (!u.Email) {
					$rootScope.$broadcast('event:anonymousUser');
					$location.path('admin');
				}
				/**/
				_then(success,u);
			},
			function(ex) {
				if (angular.isFunction(error))
					error(Error.format(ex));
			}
		);
	};

	var _reset = function(credentials, success, error) {
		store.clear();
		$resource($451.api('login')).save(credentials).$promise.then(
			function(u) {
				_then(success, u);
			},
			function(ex) {
				if (angular.isFunction(error)) {
					error(Error.format(ex));
				}
			}
		)
	};

	var _setorder = function(id, success, error) {
		$resource($451.api('user/currentorder/:id'), { id: '@id' }).save({ id: id }).$promise.then(
			function(data) {
				store.set(_cacheName, data);
				_then(success, data);
			},
			function(ex) {
				if (error)
					error(Error.format(ex));
			}
		);
	};

	var _startneworder = function(user, success, error) {
		user.CurrentOrderID = null;
		$resource($451.api('/user/neworder')).save().$promise.then(
			function(user) {
				store.set(_cacheName, user);
				$rootScope.$broadcast('event:orderUpdate', null);
				_then(success, user);
			},
			function(ex) {
				if (error)
					error(Error.format(ex));
			}
		);
	};

	var _logout = function() {
		store.clear();
		Security.logout();
	};

	return {
		get: _get,
		login: _login,
		save: _save,
		logout: _logout,
		refresh: _refresh,
		reset: _reset,
		setcurrentorder: _setorder,
		startneworder: _startneworder
	};
}]);