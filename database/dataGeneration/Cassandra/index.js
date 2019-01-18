const path = require('path');
const cassandra = require('cassandra-driver');

// COPY watches (id, wid, watch_name, series, size, watch_price) FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchData1.csv' CSV;


const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'sdc' });
client.connect((err) => {
  if (err) { throw err; }
  console.log('Connected!');
});

const copyQuery = 'COPY watches(id, wid, watch_name, series, size, watch_price, strap_id1, strap_id2, strap_id3) FROM ? WITH HEADER = TRUE';

const seedQueries = [
  { query: copyQuery, params: [path.join(__dirname, '../seedWatchCassData1.csv')] },
  { query: copyQuery, params: [path.join(__dirname, '../seedWatchCassData2.csv')] },
];

client.batch(seedQueries, { prepare: false })
  .then(() => {
    // All queries have been executed successfully
    console.log('Successfully seeded!');
  })
  .catch((err) => {
    // None of the changes have been applied
    throw err;
  });

// client.batch(seedQueries, { prepare: true }, (err) => {
//   // All queries have been executed successfully
//   // Or none of the changes have been applied, check err
//   if (err) { throw err; }
//   console.log('Sucessfully seeded!');
// });
