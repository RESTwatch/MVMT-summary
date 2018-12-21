const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('../database');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

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
