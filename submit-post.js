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

file.pipe(
	transformMathmode({
		inline:  function(tex, cb) { cb(katex.renderToString(tex)) },
		display: function(tex, cb) { cb(katex.renderToString(tex)) }
	})

).pipe(process.stdout);

//
//var date = argv.d || new Date().toISOString();
//
//if (argv.i) {
//	fs.readdir(argv.i, function(err, files){
//		if (err) {
//			fail(err);
//		} else {
//			async.each(files, function(file, cb) {
//				var source = argv.i + '/' + file;
//				var dest = config.imageDirectory + '/' + file;
//				fs.exists(dest, function(exists){
//					if (exists) {
//						cb("an image with the name '" + file + "' already exists: ");
//					} else {
//						copyFile(source, dest, cb);
//					}
//				});
//			}, function(err) {
//				if (err) {
//					fail(err);
//				} else {
//					insertPost();
//				}
//			});
//		}
//	});
//} else {
//	insertPost();
//}
//
//function insertPost() {
//	postDao.insertPost(title, file.toString(), synopsis, date, function(err) {
//		if (err) {
//			fail(err);
//		}
//		else {
//			success();
//		}
//	});
//}
//
//function success() {
//	console.log("Successfully submitted!");
//	process.exit(0);
//}
//
//function fail(err) {
//	console.log("Error submitting: %s", err);
//	process.exit(1);
//}
//
//
//function copyFile(source, target, cb) {
//	var cbCalled = false;
//
//	var rd = fs.createReadStream(source);
//	rd.on("error", done);
//
//	var wr = fs.createWriteStream(target);
//	wr.on("error", done);
//	wr.on("close", function(ex) {
//		done();
//	});
//	rd.pipe(wr);
//
//	function done(err) {
//		if (!cbCalled) {
//			cb(err);
//			cbCalled = true;
//		}
//	}
//}
