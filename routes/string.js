function createStringRoute(str, handler) {
	return function(req, res, next) {
		if(req.url === str) {
			handler(req, res, next);

			return true;
		}

		return false;
	};
}


module.exports = createStringRoute;
