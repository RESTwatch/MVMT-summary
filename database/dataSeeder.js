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

const strapIds = [1, 2, 3, 4, 5];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let watchId = 2;
for (let i = 101; i < 200; i += 1) {
  const name = watchNames[getRandomInt(0, (watchNames.length - 1))];
  const series = watchSeries[getRandomInt(0, (watchSeries.length - 1))];
  const size = sizes[getRandomInt(0, (sizes.length - 1))];
  const price = prices[getRandomInt(0, (prices.length - 1))];
  const queryStringWatch = `INSERT INTO watches (wid, name, series, size, price) VALUES ("${i}", "${name}", "${series}", "${size}", "${price}");`;
  connection.query(queryStringWatch, (err, results) => {
    if (err) {
      throw (err);
    }
  });
  const strapCount = getRandomInt(0, 5);
  if (strapCount > 0) {
    for (let j = 1; j <= strapCount; j += 1) {
      const strapId = strapIds[getRandomInt(0, (strapIds.length - 1))];
      const queryStringStrap = `INSERT INTO strap_options (watch_id, strap_id) VALUES (${watchId}, ${strapId});`;
      connection.query(queryStringStrap, (err, results) => {
        if (err) {
          throw (err);
        }
      });
    }
  }
  watchId += 1;
}
