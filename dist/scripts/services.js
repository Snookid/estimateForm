"use strict";

httpFn.$inject = ["$http"];
alertFn.$inject = ["$uibModal", "$rootScope"];angular.module('estimator').service('http', httpFn).service('totals', totalsFn).service('modal', alertFn);

function httpFn($http) {
	"ngInject";

	return {
		simplefetch: function simplefetch(url) {
			return $http.get(url).then(function (res) {
				return res.data;
			}).catch(function (err) {
				return err;
			});
		}
	};
}

function totalsFn() {
	var _this = this;

	this.masterArr = [];

	var calculateTotal = function calculateTotal(what) {
		return _this.masterArr.reduce(function (a, b) {
			return a + b[what];
		}, 0);
	};
	this.calculateTotals = function () {
		_this.totalWt = calculateTotal('totalWt');
		_this.matlCost = calculateTotal('matlCost');
		_this.laborCost = calculateTotal('laborCost');
		_this.totalCost = calculateTotal('totalCost');
		_this.lmtrs = calculateTotal('lmtrs');
		return { totalWt: _this.totalWt, matlCost: _this.matlCost, laborCost: _this.laborCost, totalCost: _this.totalCost, lmtrs: _this.lmtrs };
	};

	this.collateThisComponent = function (obj) {
		if (_this.masterArr.find(function (item) {
			return item.id === obj.id;
		})) _this.masterArr[_this.masterArr.findIndex(function (item) {
			return item.id === obj.id;
		})] = obj;else _this.masterArr.push(obj);
		return _this.calculateTotals();
	};

	this.removeThisComponent = function (obj) {
		_this.masterArr.splice(_this.masterArr.findIndex(function (item) {
			return item.id === obj.id;
		}), 1);
		return _this.calculateTotals();
	};
}

function alertFn($uibModal, $rootScope) {
	"ngInject";

	function show(controller, as, template) {

		if (!template) {
			template = "scripts/components/home/modaldefault.html";
		}

		console.log(controller);
		return $uibModal.open({
			controller: controller,
			controllerAs: as,
			templateUrl: template
		});
	}

	function showprogress() {}

	return {
		show: show,
		progress: showprogress
	};
}
//# sourceMappingURL=services.js.map
