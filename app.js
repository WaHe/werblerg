var express = require('express');
var h = require('hyperscript');
var cm = require('commonmark');
var fs = require('fs');

var wrapper = require('./templates/wrapper');
var blog = require('./templates/blog');
var listing = require('./templates/listing');
var post = require('./templates/post');
var db = require('./db');
var renderEquations = require('./helpers/render-equations');
var renderMarkdown = require('./helpers/render-markdown');

var app = express();

var doctypeString = '<!DOCTYPE html public "-//W3C//DTD HTML 4.0 Transitional//en" "http://www.w3.org/TR/html4/loose.dtd">';

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
	var send = wrapper(blog(listing()));
	res.send(send.outerHTML);
});

app.get('/post', function(req, res) {
	var file = fs.readFileSync('./posts/test.md');
	var fileString = file.toString();
	renderEquations(fileString, function(rendered) {
		var result = renderMarkdown(rendered);
		var send = wrapper(blog(post(result)));
		res.send(send.outerHTML);
	});
});

app.get('/dbtest', function(req, res) {
	res.send(db.execute("SELECT * FROM users", []));
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
