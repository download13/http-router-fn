var createStringRoute = require('./string');
var createRegexRoute = require('./regex');
var createTokenRoute = require('./token');


function createRoute(matcher, handler) {
	if(matcher instanceof RegExp) {
		return createRegexRoute(matcher, handler);
	} else if(matcher.indexOf(':') !== -1) {
		return createTokenRoute(matcher, handler);
	} else {
		return createStringRoute(matcher, handler);
	}
}


module.exports = createRoute;
