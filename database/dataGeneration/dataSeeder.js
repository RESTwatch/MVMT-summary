const fs = require('graceful-fs');
const path = require('path');
const json2csv = require('json2csv').parse;

const watchFields = [
  'id',
  'wid',
  'watch_name',
  'series',
  'size',
  'watch_price',
  'watch_id',
  'strap_ids',
];
const watchOpts = {watchFields};

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

const straps = [
  ('Black Leather', 'https://s3.amazonaws.com/watch-straps/BlackLeather_BlackMatte_260x.progressive.jpg', 35), 
  ('Gunmetal Link', 'https://s3.amazonaws.com/watch-straps/BT01-OLGU.Back_15f2bd26-737f-4b81-acca-6894dde4e729_260x.progressive.jpg', 40),
  ('Camo Nylon', 'https://s3.amazonaws.com/watch-straps/Camo_copy_260x.progressive.jpg', 30),
  ('Charcoal Nylon', 'https://s3.amazonaws.com/watch-straps/Charcoal_Black_260x.progressive.jpg', 30),
  ('Tan Leather', 'https://s3.amazonaws.com/watch-straps/TanLeather_BlackBrushed_260x.progressive.jpg', 35)
];


const sizes = [39, 40, 41, 42, 43, 44, 45];
const prices = [100, 110, 120, 125, 135, 140, 145, 150, 155, 175, 180, 200, 300];

const getRandomArrayElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const getRandomStraps = () => {
  let start = (Math.random().toFixed(1).split('.')[1] % 4);
  let end = (Math.random().toFixed(1).split('.')[1] % 4);
  let randomStraps = straps.slice(start, (end + start));
  return randomStraps;
}

const firstFile = {
  id: 1,
  wid: 100,
  watch_name: 'Voyager Monochrome',
  series: 'voyager',
  size: 42,
  watch_price: 145,
  strap_ids: [1, 2, 3]
};


fs.appendFile('/Users/miles/Desktop/Hack_reactor/sdc/MVMT-summary/database/dataGeneration/seedData1.csv', json2csv(firstFile, watchOpts));

const generateCSVRecord = (wid) => {
  let record = {};
  record.wid = wid;
  record.watch_name = getRandomArrayElement(watchNames);
  record.series = getRandomArrayElement(watchSeries);
  record.straps = getRandomStraps();
  record.watch_price = getRandomArrayElement(prices);
  return json2csv(record, watchOpts);
};

let j = 2;
let i = 101;

const writeRecords = (numRecords, recordsPerFile) => {
  let fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedData${j}.csv`));
  const write = () => {
    if ((i - 101) % recordsPerFile === 0) {
      fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedData${j}.csv`));
      j++;
      console.log(`${(i / (numRecords + 100)) * 100}% complete.`);
    }
    if (i >= numRecords + 100) {
      console.log('Complete!');
      return;
    }
    const okayToWrite = fileWriteStream.write(generateCSVRecord(i));
    if (okayToWrite) {
      i++;
      write();
    } else {
      fileWriteStream.once('drain', () => {
        write();
      })
    }
  }
  write();
};
writeRecords(10000000, 1000000);


// for (let i = 101; i < 200; i += 1) {
//   const name = watchNames[getRandomInt(0, (watchNames.length - 1))];
//   const series = watchSeries[getRandomInt(0, (watchSeries.length - 1))];
//   const size = sizes[getRandomInt(0, (sizes.length - 1))];
//   const price = prices[getRandomInt(0, (prices.length - 1))];
//   const queryStringWatch = `INSERT INTO watches (wid, watch_name, series, size, watch_price) VALUES ("${i}", "${name}", "${series}", "${size}", "${price}");`;
//   connection.query(queryStringWatch, (err) => {
//     if (err) {
//       throw (err);
//     }
//   });

//   const strapCount = getRandomInt(0, 3);

//   const strapIds = [1, 2, 3, 4, 5];
//   if (strapCount > 0) {
//     for (let j = 1; j <= strapCount; j += 1) {
//       const index = getRandomInt(0, (strapIds.length - 1));
//       const strapId = strapIds[index];
//       strapIds.splice(index, 1);
//       const queryStringStrap = `INSERT INTO strap_options (watch_id, strap_id) VALUES (${watchId}, ${strapId});`;
//       connection.query(queryStringStrap, (err) => {
//         if (err) {
//           throw (err);
//         }
//       });
//     }
//   }
//   watchId += 1;
// }
