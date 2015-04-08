function createRegexRoute(regex, handler) {
	return function(req, res, next) {
		var matches = regex.exec(req.url);

		if(matches) {
			req.params = matches.slice(1);

			handler(req, res, next);

			return true;
		}

		return false;
	};
}


module.exports = createRegexRoute;
