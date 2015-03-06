var db = require("../helpers/db");
var renderEquations = require('../helpers/render-equations');
var renderMarkdown = require('../helpers/render-markdown');

module.exports = {
	getAllPosts: function(callback) {
		db.execute("SELECT synopsis, title, id, to_char(date, 'IYYY-MM-DD') AS datestring FROM posts ORDER BY date DESC", [], callback);
	},
	getPostById: function (id, callback) {
		db.execute("SELECT html, synopsis, title, id, to_char(date, 'IYYY-MM-DD') AS datestring FROM posts WHERE id=$1::int", [id], callback);
	},
	insertPost: function (title, source, synopsis, date, callback) {
		renderEquations(source, function(rendered) {
			var html = renderMarkdown(rendered);
			db.execute(
				'INSERT INTO posts (source, html, synopsis, date, title) VALUES ($1::text, $2::text, $3::text, $4::timestamptz, $5::text) RETURNING id',
				[source, html, synopsis, date, title],
				callback
			)
		});
	}
};
