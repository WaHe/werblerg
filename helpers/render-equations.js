var mj = require('../node_modules/MathJax-node/lib/mj-single');
var async = require('async');

function replaceSubstring(str, index, length, replacement) {
	var left = str.substr(0, index);
	var right = str.substr(index + length);
	return left +  replacement + right;
}

function parseEquations(str, cb) {
	var regex = /[^\\](\$([^$]*)[^\\]\$)/g;
	var m;
	var matches = [];
	var replacements = [];
	while (m = regex.exec(str)) {
		matches.push({index: m.index + 1, len: m[0].length - 1, text: m[1].trim()});
	}
	async.each(matches,
		function(match, next) {
			mj.typeset({math: match.text, format: "inline-TeX", svg: true}, function(final){
				replacements.push(final.svg);
				next();
			});
		},
		function(err) {
			var offset = 0;
			replacements.map(function(replacement, idx) {
				str = replaceSubstring(str, matches[idx].index + offset, matches[idx].len, replacement);
				//Offset the insertion index since we've already replaced some text
				offset += replacement.length - matches[idx].len;
			});
			str = str.replace(/\\\$/g, "$");
			cb(str);
		}
	);
}

module.exports = parseEquations;
