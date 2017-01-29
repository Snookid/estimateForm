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

	let calculateTotal = (what) => this.masterArr.reduce((a, b) => a+b[what], 0);
	this.calculateTotals = () => {
		this.totalWt = calculateTotal('totalWt');
		this.matlCost = calculateTotal('matlCost');
		this.laborCost = calculateTotal('laborCost');
		this.totalCost = calculateTotal('totalCost');
		this.lmtrs = calculateTotal('lmtrs');
		return {totalWt: this.totalWt, matlCost: this.matlCost, laborCost: this.laborCost, totalCost: this.totalCost, lmtrs: this.lmtrs};
	};

	this.collateThisComponent = (obj) => {
		if(this.masterArr.find(item=>item.id===obj.id)) this.masterArr[this.masterArr.findIndex(item=>item.id===obj.id)] = obj;
			else this.masterArr.push(obj);
		return this.calculateTotals();
	};

	this.removeThisComponent = (obj) => {
		this.masterArr.splice(this.masterArr.findIndex(item=>item.id===obj.id), 1);
		return this.calculateTotals();
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