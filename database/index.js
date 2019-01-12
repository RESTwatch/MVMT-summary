const { Pool, Client } = require('pg')
const connectionOptions = {
  host: 'localhost',
  user: 'miles',
  password: 'password',
  database: 'summary',
  port: 5432,
};
const pool = new Pool(connectionOptions);
pool.connect()

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
  const queryStringStrapOptionsInfo = `INSERT INTO strap_options (watch_id, strap_id) VALUES ("${(watchId)}", "${(strap_id)}");`;
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
  const queryStringWatchInfo = `SELECT * FROM watches WHERE watches.wid = ${watchId};`;
  const queryStringStrapInfo = `SELECT * FROM watches, strap_options, straps WHERE watches.id = strap_options.watch_id AND straps.id = strap_options.strap_id AND watches.wid = ${watchId};`;
  pool.query(queryStringWatchInfo, (watchErr, watchRes) => {
    if (watchErr) {
      throw watchErr;
    } else {
      const resultArray = [watchRes];
      pool.query(queryStringStrapInfo, (strapErr, strapRes) => {
        if (strapErr) {
          throw strapErr;
        } else {
          resultArray.push(strapRes);
          callback(null, resultArray);
        }
      });
    };
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