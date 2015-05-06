var mw = require('mw-compose');

var createRoute = require('./routes');


var SHORTCUT_METHODS = ['head', 'get', 'put', 'post', 'patch', 'delete', 'options'];

var slice = Array.prototype.slice;


function createRouter() {
	var self = {_routes: {}};

	var router = dispatch.bind(self);

	router.request = request.bind(self);

	SHORTCUT_METHODS.forEach(function(method) {
		var upperMethod = method.toUpperCase();

		router[method] = request.bind(self, upperMethod);
	});

	return router;
}


// Create a handler for a router
// The shortcuts are made by the constructor
function request(method, matcher) {
	var handler = slice.call(arguments, 2);

	if(handler.length === 1) {
		handler = handler[0];
	} else {
		handler = mw.apply(null, handler);
	}

	method = method.toUpperCase();

	if(!this._routes[method]) {
		this._routes[method] = [];
	}

	var route = createRoute(matcher, handler);

	this._routes[method].push(route);
};

// Dispatches a request to be handled by the router
function dispatch(req, res, next) {
	var method = req.method.toUpperCase();

	var routes = this._routes[method] || [];

	var handled = routes.some(function(route) {
		return route(req, res, next);
	});

	if(!handled && next) {
		process.nextTick(next);
	}
};


module.exports = createRouter;
