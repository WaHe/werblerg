var express = require('express');
var fs = require('fs');
var h = require('hyperscript');

var config = require('./config');

//Load templates
var wrapper = require('./templates/wrapper')(h);
var blog = require('./templates/blog')(h);
var listing = require('./templates/listing')(h);
var post = require('./templates/post')(h);
var notFound = require('./templates/404')(h);

//Load helpers
var db = require('./helpers/db');
var verify = require('./helpers/verify');

//Load accessors
var postDao = require('./db/post');

var app = express();

if (config.sendStaticFiles) {
	app.use('/public', express.static('public'));
}

app.get('/', function (req, res) {
	postDao.getAllPosts(function(err, result) {
		if (err || result.rows.length < 1) {
			console.log(err);
			res.status(404);
			res.send(notFoundResult())
		} else {
			var send = wrapper("Walker Henderson's Blog", blog(listing(result.rows)));
			res.send(send.outerHTML);
		}

	});
});

app.get('/post/:id', function(req, res) {
	var id = req.params.id;
	if (verify.verifyId(id)) {
		postDao.getPostById(req.params.id, function(err, result) {
			if (err || result.rows.length < 1) {
				console.log(err);
				res.status(404);
				res.send(notFoundResult())
			} else {
				res.send(wrapper(result.rows[0].title, blog(post(result.rows[0]))).outerHTML);
			}

		});
	} else {
		res.send(notFoundResult());
	}
});

app.get('*', function(req, res) {
	res.send(notFoundResult());
});

function notFoundResult() {
	return wrapper("Not found", blog(notFound())).outerHTML;
}

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Werblerg listening at http://%s:%s', host, port);
});
