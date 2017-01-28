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

	this.totalWt = 0;
	this.matlCost = 0;
	this.laborCost = 0;
	this.totalCost = 0;
	// this.wtPerPc = 0;
	this.lmtrs = 0;
	this.collateThisComponent = function (obj) {
		_this.totalWt += math.round(obj.totalWt, 4);
		_this.matlCost += math.round(obj.matlCost, 4);
		_this.laborCost += math.round(obj.laborCost, 4);
		_this.totalCost += math.round(obj.totalCost, 4);
		if (obj.lmtrs) _this.lmtrs += math.round(obj.lmtrs, 4);
		_this.masterArr.push(obj);

		console.log(_this.masterArr);

		return { totalWt: _this.totalWt, matlCost: _this.matlCost, laborCost: _this.laborCost, totalCost: _this.totalCost, lmtrs: _this.lmtrs };
	};
	this.removeThisComponent = function (obj) {
		_this.totalWt -= math.round(obj.totalWt, 4);
		_this.matlCost -= math.round(obj.matlCost, 4);
		_this.laborCost -= math.round(obj.laborCost, 4);
		_this.totalCost -= math.round(obj.totalCost, 4);
		if (obj.lmtrs) _this.lmtrs -= math.round(obj.lmtrs, 4);
		_.remove(_this.masterArr, function (item) {
			return obj.id === item.id;
		});

		console.log(_this.masterArr);

		return { totalWt: _this.totalWt, matlCost: _this.matlCost, laborCost: _this.laborCost, totalCost: _this.totalCost, lmtrs: _this.lmtrs };
	};
	this.getTotal = function () {
		return { totalWt: _this.totalWt, matlCost: _this.matlCost, laborCost: _this.laborCost, totalCost: _this.totalCost, lmtrs: _this.lmtrs };
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
