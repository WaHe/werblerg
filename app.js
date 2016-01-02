var express = require('express');
var h = require('hyperscript');

var config = require('./config');

var templates = require('./templates')(h);

//Load helpers
var verify = require('./helpers/verify');

//Load accessors
var postDao = require('./db/post');

var app = express();

if (config.sendStaticFiles) {
  app.use('/public', express.static('public'));
}

function notFoundResult() {
  return templates.error('Not found', 'Sorry, but this page is not available.').outerHTML;
}

function errorResult() {
  return templates.error('Server error', 'A server error occurred.').outerHTML;
}

app.get('/', function (req, res) {
  postDao.getAllPosts(function(err, result) {
    if (err) {
      console.log(err);
      res.status(500);
      res.send(errorResult());
    } else {
      var send = templates.listing("Walker Henderson's Blog", result);
      res.send(send.outerHTML);
    }
  });
});

app.get('/post/:id', function(req, res) {
  var id = req.params.id;
  if (verify.verifyId(id)) {
    postDao.getPostById(req.params.id, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500);
        res.send(errorResult());
      } else if (!result) {
        res.status(404);
        res.send(notFoundResult());
      } else {
        res.send(templates.post(result).outerHTML);
      }
    });
  } else {
    res.status(404);
    res.send(notFoundResult());
    res.send();
  }
});

app.get('*', function(req, res) {
  res.status(404);
  res.send(notFoundResult());
});

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Werblerg listening at http://%s:%s', host, port);
});
