var express = require('express');
var h = require('hyperscript');
var wrapper = require('./templates/wrapper');
var blog = require('./templates/blog');
var db = require('./db');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	var size = 10;
	var send = wrapper(blog());
	res.send(send.outerHTML);
});

app.get('/dbtest', function(req, res) {
	res.send(db.execute("SELECT * FROM users", []));
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
