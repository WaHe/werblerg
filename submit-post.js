#!/usr/bin/env node
var postDao = require('./db/post');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var async = require('async');
var config = require('./config');
var transformMathmode = require('transform-markdown-mathmode');
var katex = require('katex');

if (argv._.length < 3) {
  console.log("Usage: submit-post.js [-d date] [-i image_folder] filename title synopsis");
  process.exit(1);
}

var filename = argv._[0];
var title = argv._[1];
var synopsis = argv._[2];

var file = fs.createReadStream(filename);
var date = argv.d || new Date().toISOString();
var imageFolder = argv.i;

var pipe = file.pipe(
  transformMathmode({
    inline:  function(tex, cb) { cb(katex.renderToString(tex)) },
    display: function(tex, cb) { cb(katex.renderToString(tex)) }
  })
);

var s = '';
pipe.on('data', function(chunk) {
  s += chunk;
});

pipe.on('end', function() {
  postDao.insertPost(title, s, synopsis, date, function(err) {
    if (err) {
      fail(err);
    }
    else {
      success();
    }
  });
});

function success() {
  console.log("Successfully submitted!");
  process.exit(0);
}

function fail(err) {
  console.log("Error submitting: %s", err);
  process.exit(1);
}
