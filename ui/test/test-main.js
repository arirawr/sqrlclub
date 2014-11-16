var tests = [];

for(var file in window.__karma__.files){
	if(window.__karma__.files.hasOwnProperty(file)){
		if(/Tests\.js$/.test(file)){
			tests.push(file);
		}
	}
}

var paths = requireConfig.paths;
var shim = requireConfig.shim;

paths.angularMocks = './app/lib/angular-mocks/angular-mocks';
shim.angularMocks = {
	deps: ['angular'],
	exports: 'angular.mock'
};

var requireConfigForTests = {
	baseUrl: '/base/app/js',

	paths: paths,
	shim: shim,
	packages: requireConfig.packages,
	priority: requireConfig.priority,

	deps: tests,

	callback: window.__karma__.start
};

requirejs.config(requireConfigForTests);