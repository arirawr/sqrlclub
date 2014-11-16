var requireConfig = {
	baseUrl: "app/js",
	paths: {
	  	jquery: '../lib/jquery/dist/jquery',
		angular: '../lib/angular/angular',
	  	angularRoute: '../lib/angular-route/angular-route',
	  	angularAnimate: '../lib/angular-animate/angular-animate',
	  	requirelib: '../lib/requirejs/require',
	  	bootstrap: '../lib/bootstrap/dist/js/bootstrap',
	  	uiBootstrap: '../lib/angular-bootstrap/ui-bootstrap-tpls',
	  	ngStrap: '../lib/angular-strap/dist/angular-strap',
	  	ngStrapTpl: '../lib/angular-strap/dist/angular-strap.tpl',
	  	loadingBar: '../lib/angular-loading-bar/build/loading-bar',
	  	toaster: '../lib/AngularJS-Toaster/toaster',
		ace: '../lib/ace-builds/src-min-noconflict/ace',
	  	angularAce: '../lib/angular-ui-ace/ui-ace',
		aceCSS: '../lib/ace-builds/src-min-noconflict/mode-css',
		aceHTML: '../lib/ace-builds/src-min-noconflict/mode-html',
		aceJS: '../lib/ace-builds/src-min-noconflict/mode-javascript',
		'worker-css': '../lib/ace-builds/src-min-noconflict/worker-css',
		'worker-html': '../lib/ace-builds/src-min-noconflict/worker-html',
		'worker-javascript': '../lib/ace-builds/src-min-noconflict/worker-javascript',
		'ext-language_tools': '../lib/ace-builds/src-min-noconflict/ext-language_tools'
	},
	shim: {
		jquery: {
			exports: ['jQuery', '$']
		},
		angular: {
			deps: ['jquery'],
			exports: 'angular'
		},
		angularRoute: ['angular'],
		angularAnimate: {
			deps: ['angular']
		},
		bootstrap: {
			deps: ['angular']
		},
		uiBootstrap: {
			deps: ['angular']
		},
		ngStrap: {
			deps: ['angularAnimate']
		},
		ngStrapTpl: {
			deps: ['ngStrap']
		},
		loadingBar: {
			deps: ['angular']
		},
		toaster: {
			deps: ['angularAnimate']
		},
		ace : {
			deps: ['angular']
		},
		angularAce: {
			deps: ['ace']
		},
		aceCSS:{
			deps:['ace']
		},
		aceHTML:{
			deps:['ace']
		},
		aceJS:{
			deps:['ace']
		},
		'worker-css':{
			deps:['ace']
		},
		'worker-html':{
			deps:['ace']
		},
		'worker-javascript':{
			deps:['ace']
		},
		'ext-language_tools': {
			deps:['ace']
		}
	},
	optimize: 'none',
	packages: ["controllers", "services"],
	include: ["requirelib"],
	priority: [
		"angular"
	],
	name: "main"
};

if(typeof(module) !== 'undefined'){
	module.exports = {
		requireConfig: requireConfig
	};
}