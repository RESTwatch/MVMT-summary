const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const db = require('../database');
// const db = require('../database/dataGeneration/Cassandra/index');
const { createWatchInfo, getWatchInfo, updateWatchInfo, deleteWatchInfo } = require('../database/index.js');

const app = express();
const port = 3002;

app.use('/watches/:wid', express.static('client/public'));
app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/watches/:wid/:name', (req, res) => {
  const watchId = req.params.wid;
  const watchName = req.params.name;
  createWatchInfo(watchId, watchName, req.body, () => {
    res.send('Success creating watch!');
  });
});

app.get('/api/watches/:wid/summary', (req, res) => {
  const watchId = req.params.wid;
  console.log('params:  ', req.params);
  console.log('req.body:  ', req.body);

  getWatchInfo(watchId, (err, results) => {
    if (err) {
      console.log('ERROR:   ', err);
      throw err;
    } else {
      console.log(results);
      res.status(200);
      res.send(JSON.stringify(results));    }
  });
});

// app.put('/api/watches/:wid/:name', (req, res) => {
//   const watchId = req.params.wid;
//   const watchName = req.params.name;
//   updateWatchInfo(watchId, watchName, req.body, () => {
//     res.send('Success updating watch!');
//   });
// });

app.put('/api/watches/:wid/:name', (req, res) => {
  const watchId = req.params.wid;
  const watchName = req.params.name;
  updateWatchInfo(watchId, watchName, req.body, () => {
    res.send('Success updating watch!');
  });
});

app.delete('api/watches/:wid/:name', (req, res) => {
  const watchId = req.params.wid;
  const watchName = req.params.name;
  deleteWatchInfo(watchId, watchName, req.body, () => {
    res.send('Success watch!');
  });
});

app.listen(port, () => { console.log(`listening on ${port}`); });
