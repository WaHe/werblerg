var pg = require('pg').native;
var conString = "postgres://postgres:terriblehummusdebacle@localhost/postgres";

function execute(query, parameters, callback) {
	pg.connect(conString, function (err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(query, parameters, function (err, result) {
			done();
			callback(err, result);
		});
	});
}

module.exports = {
	execute: execute
};
