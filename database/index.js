const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getWatchInfo = (watchId, callback) => {
  const queryString = `SELECT * FROM watches, strap_options, straps WHERE watches.id = strap_options.watch_id AND straps.id = strap_options.strap_id AND watches.wid = ${watchId};`;
  connection.query(queryString, callback);
};

module.exports = { getWatchInfo };
