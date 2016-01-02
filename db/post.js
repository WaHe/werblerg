var db = require("../helpers/db");
var renderEquations = require('../helpers/render-equations');
var renderMarkdown = require('../helpers/render-markdown');

module.exports = {
  getAllPosts: function(callback) {
    db.execute("SELECT synopsis, title, id, to_char(date, 'IYYY-MM-DD') AS datestring FROM posts ORDER BY date DESC", [], function(err, result) {
      if (err) {
        callback("A database error occurred.");
        return;
      }
      callback(null, result.rows);
    });
  },
  getPostById: function (id, callback) {
    db.execute("SELECT html, synopsis, title, id, to_char(date, 'IYYY-MM-DD') AS datestring FROM posts WHERE id=$1::int", [id], function(err, result) {
      if (err) {
        callback("A database error occurred.");
        return;
      }
      if (result.length < 1) {
        callback(null, null);
        return;
      }
      callback(null, result.rows[0]);
    });
  },
  insertPost: function (title, source, synopsis, date, callback) {
    var html = renderMarkdown(source);
    db.execute(
      'INSERT INTO posts (source, html, synopsis, date, title) VALUES ($1::text, $2::text, $3::text, $4::timestamptz, $5::text) RETURNING id',
      [source, html, synopsis, date, title],
      callback
    );
  }
};
