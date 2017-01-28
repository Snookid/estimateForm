angular
	.module('estimator')
	.service('http', httpFn)
	.service('totals', totalsFn)
	.service('modal', alertFn);

function httpFn($http){
	"ngInject";
	return {
		simplefetch: function(url) { 
			return $http.get(url).then((res) => res.data).catch((err) => err);
		}
	};
}

function totalsFn(){
	this.masterArr = [];

	this.totalWt = 0;
	this.matlCost = 0;
	this.laborCost = 0; 
	this.totalCost = 0;
	// this.wtPerPc = 0;
	this.lmtrs = 0;
	this.collateThisComponent = (obj) => {
		this.totalWt += math.round(obj.totalWt, 4);
		this.matlCost += math.round(obj.matlCost, 4);
		this.laborCost += math.round(obj.laborCost, 4);
		this.totalCost += math.round(obj.totalCost, 4);
		if(obj.lmtrs) this.lmtrs += math.round(obj.lmtrs, 4);
		this.masterArr.push(obj);

		console.log(this.masterArr);

		return {totalWt: this.totalWt, matlCost: this.matlCost, laborCost: this.laborCost, totalCost: this.totalCost, lmtrs: this.lmtrs};
	};
	this.removeThisComponent = (obj) => {
		this.totalWt -= math.round(obj.totalWt, 4);
		this.matlCost -= math.round(obj.matlCost, 4);
		this.laborCost -= math.round(obj.laborCost, 4);
		this.totalCost -= math.round(obj.totalCost, 4);
		if(obj.lmtrs) this.lmtrs -= math.round(obj.lmtrs, 4);
		_.remove(this.masterArr, (item) => {
			return obj.id===item.id;
		});

		console.log(this.masterArr);

		return {totalWt: this.totalWt, matlCost: this.matlCost, laborCost: this.laborCost, totalCost: this.totalCost, lmtrs: this.lmtrs};
	};
	this.getTotal = () => { 
		return {totalWt: this.totalWt, matlCost: this.matlCost, laborCost: this.laborCost, totalCost: this.totalCost, lmtrs: this.lmtrs};
	};
}

function alertFn($uibModal, $rootScope){
	"ngInject";
        
    function show(controller, as, template){

        if(!template){
            template = "scripts/components/home/modaldefault.html";
        }
        
        console.log(controller);
        return $uibModal.open({
            controller: controller,
            controllerAs: as,
            templateUrl: template
        });
    }
    
    function showprogress(){
        
    }
    
    return {
        show: show,
        progress: showprogress
    };
}