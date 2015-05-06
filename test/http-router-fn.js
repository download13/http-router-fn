var createRouter = require('../http-router-fn');

var assert = require('assert');


describe('createRouter', function() {
	var router;

	it('should be created without errors', function() {
		router = createRouter();
	});

	it('should take a string as a pattern', function(done) {
		router.get('/', function(req, res) {
			done();
		});

		get(router, '/');
	});

	it('should take a regex as a pattern', function(done) {
		router.get(/\/0\/someone/i, function(req, res) {
			done();
		});

		get(router, '/0/SOMEONE');
	});

	it('should take a token string as a pattern', function(done) {
		router.get('/path/:id', function(req, res) {
			assert.deepEqual(req.params, ['3423565']);

			done();
		});

		get(router, '/path/3423565');
	});

	it('should only fire a handler with the correct method', function() {
		router.get('/1', function(req, res) {
			done(new Error('This should not have executed'));
		});

		post(router, '/1');

		setTimeout(function() {
			done();
		}, 100);
	});

	it('should put params on a request with a matching regex', function(done) {
		router.get(/\/5\/([a-z]+)/, function(req, res) {
			assert.deepEqual(req.params, ['somestring']);

			done();
		});

		get(router, '/5/somestring');
	});
	
	it('should take middleware handlers on routes', function(done) {
		router.get('/6', function(req, res, next) {
			res.testprop = true;

			next();
		}, function(req, res) {
			assert(res.testprop);

			done();
		});

		get(router, '/6');
	});
	
	it('should pass execution to the next middleware when there is no valid handler', function(done) {
		get(router, '/7', function() {
			done();
		});
	});
});


function request(method, handler, url, next) {
	var req = {
		method: method,
		url: url
	};

	var res = {};

	handler(req, res, next);

	return res;
}

var get = request.bind(null, 'GET');

var post = request.bind(null, 'POST');
