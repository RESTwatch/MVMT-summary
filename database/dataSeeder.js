const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const watchNames = [
  'Slate',
  'Hustle',
  'Classic Monochrome',
  'Oath',
  'Gunmetal',
  'Raith',
  'Rhine',
  'Black Link',
  'Ghost',
  'Bristol',
  'Bourbon Rose',
  'Iron Elm',
  'Eclipse',
  'Joyride',
  'Indie',
  'Starlight Black',
  'Myst',
  'Black Sage Grey',
  'Calypso',
];

const watchSeries = [
  'Voyager',
  'Rise',
  'Classic',
  'Chrono',
  'Revolver',
  'Modern Sport',
  'ARC Automatic',
  'Blacktop',
  'Chrono 40mm',
];

const sizes = [39, 40, 41, 42, 43, 44, 45];

const prices = [100, 110, 120, 125, 135, 140, 145, 150, 155, 175, 180, 200, 300];

// const strapIds = [1, 2, 3, 4, 5];

function getRandomInt(min, max) {
  const minC = Math.ceil(min);
  const maxC = Math.floor(max);
  return Math.floor(Math.random() * (maxC - minC + 1)) + minC;
}

for (let i = 101; i < 200; i += 1) {
  const name = watchNames[getRandomInt(0, (watchNames.length - 1))];
  const series = watchSeries[getRandomInt(0, (watchSeries.length - 1))];
  const size = sizes[getRandomInt(0, (sizes.length - 1))];
  const price = prices[getRandomInt(0, (prices.length - 1))];
  const queryStringWatch = `INSERT INTO watches (wid, name, series, size, price) VALUES ("${i}", "${name}", "${series}", "${size}", "${price}");`;
  connection.query(queryStringWatch, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
  // const queryStringStraps = `;`;
}

// INSERT INTO watches (wid, name, series, size, price) VALUES
// (100, "Voyager Monochrome", "Voyager", 42, 145);
// INSERT INTO strap_options (watch_id, strap_id) VALUES (1, 1), (1, 2), (1, 3);
