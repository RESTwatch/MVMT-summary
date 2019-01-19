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

  // SELECT name, pathfilename
  // FROM table1
  // NATURAL JOIN table2
  // NATURAL JOIN table3
  // WHERE name = 'John';

// SELECT a.id, a.feature_type, b.datetime, b.file_path
// FROM
// (
// SELECT id, feature_type, metadata_id FROM watches
// UNION ALL
// SELECT id, feature_type, metadata_id FROM straps
// )a, metadata b
// WHERE a.metadata_id = b.id

// const queryStringWatchInfo = `
// SELECT *
// FROM watches a, strap_options b WHERE a.wid = b.wid
// UNION ALL
// SELECT *
// FROM straps a, strap_options b WHERE a.strap_id = b.strap_id`
// SELECT id, wid, watch_name, unique_name, series, size, watch_price
// FROM watches a, strap_options b WHERE a.wid = b.wid
// UNION ALL
// SELECT id, strap_id, strap_name, strap_image, strap_price
// FROM straps a, strap_options b WHERE a.strap_id = b.strap_id`


  const queryStringWatchInfo = `
  select t1.*, t2.wid, t3.strap_id, t3.strap_name, t3.strap_image, t3.strap_price
  from watches t1 left join strap_options t2 on t1.wid = t2.wid
  left join straps t3 on t2.strap_id=t3.strap_id where t1.wid=${watchId}`;
  // const queryStringWatchInfo = `SELECT * FROM strap_options WHERE wid = ${watchId};`;
  // const queryStringWatchInfo = `SELECT * FROM watches, straps WHERE wid = ${watchId} AND strap_id = ;`;
  // const queryStringWatchInfo = `SELECT * FROM watches, straps, strap_options WHERE watches.wid = strap_options.wid AND straps.strap_id = strap_options.strap_id AND watches.wid = ${watchId};`;
  pool.query(queryStringWatchInfo, (watchErr, watchRes) => {

    if (watchErr) {
      callback(watchErr);
      throw watchErr;
    } else {
      // console.log('watchRES:  ', watchRes);
      callback(null, watchRes);
    }
    
    // else {
    //   const resultArray = [watchRes];
    //   pool.query(queryStringStrapInfo, (strapErr, strapRes) => {
    //     if (strapErr) {
    //       throw strapErr;
    //     } else {
    //       resultArray.push(strapRes);
    //       callback(null, resultArray);
    //     }
    //   });
    // };
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