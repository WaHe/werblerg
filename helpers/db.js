var pg = require('pg').native;
var config = require('../config');

function execute(query, parameters, callback) {
  pg.connect(config.databaseURL, function (err, client, done) {
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
