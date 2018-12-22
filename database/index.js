const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getWatchInfo = (watchId, callback) => {
  const queryStringWatchInfo = `SELECT * FROM watches WHERE watches.wid = ${watchId};`;
  const queryStringStrapInfo = `SELECT * FROM watches, strap_options, straps WHERE watches.id = strap_options.watch_id AND straps.id = strap_options.strap_id AND watches.wid = ${watchId};`;
  connection.query(queryStringWatchInfo, (watchErr, watchRes) => {
    if (watchErr) {
      throw watchErr;
    } else {
      const resultArray = [watchRes];
      connection.query(queryStringStrapInfo, (strapErr, strapRes) => {
        if (strapErr) {
          throw strapErr;
        } else {
          resultArray.push(strapRes);
          callback(null, resultArray);
        }
      });
    }
  });
};

module.exports = { getWatchInfo };
