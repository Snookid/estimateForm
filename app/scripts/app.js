let app = angular.module('estimator', ['ui.bootstrap', 'ngTable']);

app.run(function(ngTableDefaults){
	"ngInject";
	ngTableDefaults.params.count = 50;
});

//instantiate bindings before oninit //w/o this bindings will be lazyloaded
app.config(function($compileProvider){
	"ngInject";
	$compileProvider.preAssignBindingsEnabled(true);
});

app.filter('dateparse', function(){
	return (date, whatformat) => {
		if(!date) return "No date yet";
		if(isNaN(date)) return date;
		if(!whatformat) whatformat = 'MM/DD/YY';
		return moment(Number(date)).format(whatformat);
	};
});

app.filter('displaydatadecimal', function(){
	return (num, dec) => math.round(num, dec);
});

app.constant('default_customerInfo', {
	date: new Date().toLocaleDateString(),
	customer: "",
	project: "",
	location: "",
	attn: "",
	se: "",
	basedOn: "",
	bldgArea: "",
	estimatedBy: ""
});