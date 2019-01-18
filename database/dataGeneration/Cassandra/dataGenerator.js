const fs = require('graceful-fs');
const path = require('path');
const json2csv = require('json2csv').parse;

const watchFields = [
  'id',
  'wid',
  'watch_name',
  'unique_name',
  'series',
  'size',
  'watch_price',
  'strap_id1',
  'strap_id2',
  'strap_id3'
];

const watchOpts = {watchFields, quote: "'"};
const opts = {headers: true, quote: "'"};

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
  {strap_id: 1, strap_name: 'Black Leather', strap_image: 'https://s3.amazonaws.com/watch-straps/BlackLeather_BlackMatte_260x.progressive.jpg', strap_price: 35}, 
  {strap_id: 2, strap_name: 'Gunmetal Link', strap_image: 'https://s3.amazonaws.com/watch-straps/BT01-OLGU.Back_15f2bd26-737f-4b81-acca-6894dde4e729_260x.progressive.jpg', strap_price: 40},
  {strap_id: 3, strap_name: 'Camo Nylon', strap_image: 'https://s3.amazonaws.com/watch-straps/Camo_copy_260x.progressive.jpg', strap_price: 30},
  {strap_id: 4, strap_name: 'Charcoal Nylon', strap_image: 'https://s3.amazonaws.com/watch-straps/Charcoal_Black_260x.progressive.jpg', strap_price: 30},
  {strap_id: 5, strap_name: 'Tan Leather', strap_image: 'https://s3.amazonaws.com/watch-straps/TanLeather_BlackBrushed_260x.progressive.jpg', strap_price: 35}
];

const strapIds = [1, 2, 3, 4, 5];

const sizes = [39, 40, 41, 42, 43, 44, 45];
const prices = [100, 110, 120, 125, 135, 140, 145, 150, 155, 175, 180, 200, 300];

const getRandomArrayElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

let getRandomStraps = () => {
  let length = (Math.random().toFixed(1).split('.')[1] % 4);
  let start = (Math.random().toFixed(1).split('.')[1] % 5);
  let end = (start + length);
  let randomStraps = strapIds.slice(start, end);
  return randomStraps;
};

const firstWatchFile = {
  id: 100,
  wid: 100,
  watch_name: 'Voyager Monochrome',
  unique_name: 'watch_100',
  series: 'Voyager',
  size: 42,
  watch_price: 145,
  strap_id1: 1,
  strap_id2: 2,
  strap_id3: 3
};

fs.appendFile('/Users/miles/Desktop/Hack_reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchCassData1.csv', json2csv(firstWatchFile, watchOpts) + '\n');

const generateCSVRecord = (id, recordsPerFile) => {
  let record = {};
  let strap_ids = getRandomStraps();
  let watchName = getRandomArrayElement(watchNames);
  let uniqueName = 'watch_' + `${id}`;
  record.id = id;
  record.wid = id;
  record.watch_name = watchName;
  record.unique_name = uniqueName;
  record.series = getRandomArrayElement(watchSeries);
  record.size = getRandomArrayElement(sizes);
  record.watch_price = getRandomArrayElement(prices);
  record.strap_id1 = (strap_ids[0]);
  record.strap_id2 = (strap_ids[1]);
  record.strap_id3 = (strap_ids[2]);

  let csvStr = ``;
    if (strap_ids.length === 3) {
      csvStr = `${record.id}, ${record.wid}, '${record.watch_name}', '${record.unique_name}', '${record.series}', ${record.size}, ${record.watch_price}, ${record.strap_id1}, ${record.strap_id2}, ${record.strap_id3}` + '\n';
  } else if (strap_ids.length === 2) {
    csvStr = `${record.id}, ${record.wid}, '${record.watch_name}', '${record.unique_name}', '${record.series}', ${record.size}, ${record.watch_price}, ${record.strap_id1}, ${record.strap_id2},` + '\n';
  } else if (strap_ids.length === 1)  {
    csvStr = `${record.id}, ${record.wid}, '${record.watch_name}', '${record.unique_name}', '${record.series}', ${record.size}, ${record.watch_price}, ${record.strap_id1},,` + '\n';
  } else {
    csvStr = `${record.id}, ${record.wid}, '${record.watch_name}', '${record.unique_name}', '${record.series}', ${record.size}, ${record.watch_price},,,` + '\n';
  }

  if ((i - 101) % recordsPerFile === 0) {
    return (json2csv(record, watchOpts) + '\n');
  } else {
    return (`${csvStr}`);
  } 
};

let j = 2;
let i = 101;
let startTime = Date.now();

const writeRecords = (numRecords, recordsPerFile) => {
  let fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedWatchCassData1.csv`));
  const write = () => {
    if ((i - 101) % recordsPerFile === 0) {
      fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedWatchCassData2.csv`));
      j++;
      console.log(`${(i / (numRecords + 100)) * 100}% complete.`);
    }
    if (i >= numRecords + 100) {
      console.log('Complete!');
      console.log(`Time elapsed(watches): ${(Date.now() - startTime) / 1000} seconds.`)
      return;
    }
    const okayToWrite = fileWriteStream.write(generateCSVRecord(i, recordsPerFile));
    if (okayToWrite) {
      i++;
      write();
    } else {
      fileWriteStream.once('drain', () => {
        i++;
        write();
      })
    }
  }
  write();
};
writeRecords(10000000, 10000000);
// writeRecords(1000, 1000);
