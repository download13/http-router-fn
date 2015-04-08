# http-router-fn

Creates a middleware handler that can organize other handlers into routes. Router is the dispatch function as well.

## Install:
	npm i http-router-fn

## Example:
```javascript
var http = require('http');

var createRouter = require('http-router-fn');


var router = createRouter();

router.get('/', function(req, res) {
	res.end('Index page!');
});

http.createServer(router).listen(80);
```


## API:
* createRouter() - Creates a new router
  * (req, res[, next]) - Call router directly to make it handle a request
  * .get(pattern, [mw1, mw2,] handler) - Adds a GET route
  * .post() - POST route
  * .put()
  * .head()
  * .patch()
  * .delete()
  * .options()

### Options:
* pattern - Can be a string or regex object. Also support express-style token strings.
* mw - Any number of middleware handlers may be placed in front of the handler. They will executed before the handler.
* handler - An express-style handler.

## License: MIT
