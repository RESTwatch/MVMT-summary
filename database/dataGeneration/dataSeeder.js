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
  let length = (Math.random().toFixed(1).split('.')[1] % 4)
  let start = (Math.random().toFixed(1).split('.')[1] % length);
  let end = (start + length);
  let randomStraps = strapIds.slice(start, end);
  return randomStraps;
};

const firstWatchFile = {
  id: 100,
  wid: 100,
  watch_name: 'Voyager Monochrome',
  series: 'Voyager',
  size: 42,
  watch_price: 145,
  strap_id1: 1,
  strap_id2: 2,
  strap_id3: 3
};

fs.appendFile('/Users/miles/Desktop/Hack_reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchData1.csv', json2csv(firstWatchFile, watchOpts));

const generateCSVRecord = (id, recordsPerFile) => {
  let record = {};
  let strap_ids = getRandomStraps();
  record.id = id;
  record.wid = id;
  record.watch_name = getRandomArrayElement(watchNames);
  record.series = getRandomArrayElement(watchSeries);
  record.size = getRandomArrayElement(sizes);
  record.watch_price = getRandomArrayElement(prices);
  record.strap_id1 = (strap_ids[0] || null);
  record.strap_id2 = (strap_ids[1] || null);
  record.strap_id3 = (strap_ids[2] || null);
  if ((i - 101) % recordsPerFile === 0) {
    return (json2csv(record, watchOpts) + '\n');
  } else {
    return (json2csv(record, opts) + '\n');
  } 
};

let j = 2;
let i = 101;
let startTime = Date.now();

const writeRecords = (numRecords, recordsPerFile) => {
  let fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedWatchData${j}.csv`));
  const write = () => {
    if ((i - 101) % recordsPerFile === 0) {
      fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedWatchData${j}.csv`));
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
        write();
      })
    }
  }
  write();
};
writeRecords(10000, 10000);

const strapOptionsFields = [
  'id',
  'watch_id',
  'strap_id'
];
const strapOpts = {strapOptionsFields, quote: "'"};

const firstStrapOptionsFile = {
  id: 100,
  watch_id: 100,
  strap_id: 1
};

fs.appendFileSync('/Users/miles/Desktop/Hack_reactor/sdc/MVMT-summary/database/dataGeneration/seedStrapData1.csv', json2csv(firstStrapOptionsFile, strapOpts));

let p = 2;
let n = 101;
let currentWatchId = 101;
let startStrapRelTime = Date.now();

const generateStrapCSVRecord = (recordsPerFile) => {

  let strap_ids = getRandomStraps();
  let record = {};
  record.id = n;
  record.watch_id = currentWatchId;
  record.strap_id = (strap_ids[0]);

  let record_1 = {};
  record_1.id = n;
  record_1.watch_id = currentWatchId;
  record_1.strap_id = (strap_ids[0]);

  let record_2 = {};
  record_2.id = n + 1;
  record_2.watch_id = currentWatchId;
  record_2.strap_id = (strap_ids[1]);

  let record_3 = {};
  record_3.id = n + 2;
  record_3.watch_id = currentWatchId;
  record_3.strap_id = (strap_ids[2]);

  let strOne = json2csv(record_1, opts) + '\n';
  let strTwo = json2csv(record_2, opts) + '\n';
  let strThree = json2csv(record_3, opts) + '\n';

  let csvStr = '';
  if (strap_ids.length === 3) {
    n += 3;
    csvStr = csvStr + strOne + strTwo + strThree;
  } else if (strap_ids.length === 2) {
    n += 2;
    csvStr = csvStr + strOne + strTwo;
  } else if (strap_ids.length < 2)  {
    n += 1;
    csvStr = csvStr + strOne
  }

  if ((n - 101) % recordsPerFile === 0) {
    return (json2csv(record, strapOpts) + '\n');
  } else {
    return (`${csvStr}`);
  } 
};

const writeOptionsRecords = (numRecords, recordsPerFile) => {
  let fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedStrapData${p}.csv`));
  const writeStrap = () => {
    if ((n - 101) % recordsPerFile === 0) {
      fileWriteStream = fs.createWriteStream(path.join(__dirname, `/seedStrapData${p}.csv`));
      p++;
      console.log(`${(n / (numRecords + 100)) * 100}% complete.`);
    }
    if (n >= numRecords + 100) {
      console.log('Complete!');
      console.log(`Time elapsed(strapOptions): ${(Date.now() - startStrapRelTime) / 1000} seconds.`);
      console.log(`Time elapsed(TOTAL): ${(Date.now() - startTime) / 1000} seconds.`);
      return;
    }
    const okayToWriteStrap = fileWriteStream.write(generateStrapCSVRecord(recordsPerFile));
    if (okayToWriteStrap) {
      currentWatchId += 1;
      writeStrap();
    } else {
      fileWriteStream.once('drain', () => {
        writeStrap();
      })
    }
  }
  writeStrap();
};
writeOptionsRecords(10000, 10000);
