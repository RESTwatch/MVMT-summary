const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getWatchInfo = (watchId, callback) => {
  const queryString = 'SELECT * FROM watches;';
  connection.query(queryString, callback);
};

module.exports = { getWatchInfo };
