const express = require('express');
const morgan = require('morgan');

const db = require('../database');

const app = express();
const port = 3002;

app.use(morgan('short'));
app.use('/watches/:wid', express.static('client/public'));

app.get('/api/watches/:wid/summary', (req, res) => {
  const watchId = req.params.wid;
  db.getWatchInfo(watchId, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => { console.log(`listening on ${port}`); });
