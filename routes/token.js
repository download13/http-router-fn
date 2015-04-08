var pathToRegexp = require('path-to-regexp');
var createRegexRoute = require('./regex');


function createTokenRoute(str, handler) {
	return createRegexRoute(pathToRegexp(str), handler);
}


module.exports = createTokenRoute;
