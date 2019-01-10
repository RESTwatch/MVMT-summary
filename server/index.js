const express = require('express');
const morgan = require('morgan');
const db = require('../database');
const { createWatchInfo, getWatchInfo, updateWatchInfo, deleteWatchInfo } = require('../database/index.js');

const app = express();
const port = 3002;

app.use(morgan('short'));
app.use('/watches/:wid', express.static('client/public'));

app.post('/api/watches/:wid/:name', (req, res) => {
  const watchId = req.params.wid;
  const watchName = req.params.name;
  createWatchInfo(watchId, watchName, req.body, () => {
    res.send('Success creating watch!');
  });
});

app.get('/api/watches/:wid/summary', (req, res) => {
  const watchId = req.params.wid;
  getWatchInfo(watchId, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

app.put('/api/watches/:wid/:name', (req, res) => {
  const watchId = req.params.wid;
  const watchName = req.params.name;
  updateWatchInfo(watchId, watchName, req.body, () => {
    res.send('Success updating watch!');
  });
});

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
    res.send('Success deleting watch!');
  });
});

app.listen(port, () => { console.log(`listening on ${port}`); });
