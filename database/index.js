const { Pool, Client } = require('pg');
const connectionOptions = {
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'summary',
  port: 5432,
};
const pool = new Pool(connectionOptions);
pool.connect();

const createWatchInfo = (watchId, watchName, options, callback) => {
  let strapIds = [1, 2, 3, 4, 5];
  let strap_id = strapIds[(Math.random().toFixed(1).split('.')[1] % 5)];
  const queryStringWatchInfo = 
  `INSERT INTO watches (wid, watch_name, series, size, watch_price) 
    VALUES (
      "${watchId}", "${watchName}", 
      "${options.series}", "${options.size}",
      "${options.watch_price}"
    );`
  const queryStringStrapOptionsInfo = `INSERT INTO strap_options (wid, strap_id) VALUES ("${(watchId)}", "${(strap_id)}");`;
  pool.query(queryStringWatchInfo, (watchErr, watchRes) => {
    if (watchErr) {
      throw watchErr;
    } else {
      const resultArray = [watchRes];
      pool.query(queryStringStrapOptionsInfo, (strapOptionsErr, strapOptionsRes) => {
        if (strapOptionsErr) {
          throw strapOptionsErr;
        } else {
          resultArray.push(strapOptionsRes);
          callback(null, resultArray);
        }
      });
    }
  });
};

const getWatchInfo = (watchId, callback) => {

/*
explain analyze select t1.*, t2.wid, t3.strap_id, t3.strap_name, t3.strap_image, t3.strap_price
from watches t1 left join strap_options t2 on t1.wid = t2.wid
left join straps t3 on t2.strap_id = t3.strap_id where t1.wid = 941;
*/

  const queryStringWatchInfo = 
  `select t1.*, t2.wid, t3.strap_id, t3.strap_name, t3.strap_image, t3.strap_price
  from watches t1 left join strap_options t2 on t1.wid = t2.wid
  left join straps t3 on t2.strap_id=t3.strap_id where t1.wid=${watchId}`;

  pool.query(queryStringWatchInfo, (watchErr, watchRes) => {
    if (watchErr) {
      callback(watchErr);
    } else {
      callback(null, watchRes);
    }
  });
};

const updateWatchInfo = (watchId, watchName, callback) => {
  const queryStringWatchInfo = 
  `UPDATE watches SET 
    wid = "${watchId}", 
    watch_name = "${watchName}", 
    series = "${options.series}", 
    size = "${options.size}", 
    watch_price = "${options.watch_price}"`;

  const queryStringStrapOptionsInfo = 
  `UPDATE strap_options 
    SET strap_id = options.strap_id 
    WHERE wid = "${watchId}"`;

  pool.query(queryStringWatchInfo, (watchErr, watchRes) => {
    if (watchErr) {
      throw watchErr;
    } else {
      const resultArray = [watchRes];
      pool.query(queryStringStrapOptionsInfo, (strapOptionsErr, strapOptionsRes) => {
        if (strapErr) {
          throw strapOptionsErr;
        } else {
          resultArray.push(strapOptionsRes);
          callback(null, resultArray);
        }
      });
    }
  });
};

const deleteWatchInfo = (watchId, watchName, callback) => {
  const queryStringWatchInfo = 
  `DELETE FROM watches WHERE watches.wid = "${watchId}"`;

  const queryStringStrapOptionsInfo = 
  `DELETE FROM strap_options WHERE watches.wid = "${watchId}"`;

  pool.query(queryStringWatchInfo, (watchErr, watchRes) => {
    if (watchErr) {
      throw watchErr;
    } else {
      const resultArray = [watchRes];
      pool.query(queryStringStrapOptionsInfo, (strapOptionsErr, strapOptionsRes) => {
        if (strapErr) {
          throw strapOptionsErr;
        } else {
          resultArray.push(strapOptionsRes);
          callback(null, resultArray);
        }
      });
    }
  });
};


module.exports.createWatchInfo = createWatchInfo;
module.exports.getWatchInfo = getWatchInfo;
module.exports.updateWatchInfo = updateWatchInfo;
module.exports.deleteWatchInfo = deleteWatchInfo;