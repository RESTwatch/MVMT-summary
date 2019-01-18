
-- DROP SCHEMA IF EXISTS summary;
DROP DATABASE IF EXISTS summary;
-- DROP TABLE IF EXISTS summary.watches;
-- DROP TABLE IF EXISTS summary.straps;
-- DROP TABLE IF EXISTS summary.strap_options;
-- CREATE SCHEMA summary;
CREATE DATABASE summary;
\c summary;

CREATE TABLE watches (
  id serial,
  wid integer PRIMARY KEY,
  watch_name TEXT NOT NULL,
  unique_name TEXT NOT NULL,
  series TEXT NOT NULL,
  size integer NOT NULL,
  watch_price integer NOT NULL
);

CREATE TABLE straps (
  id serial,
  strap_id integer PRIMARY KEY,
  strap_name TEXT NOT NULL,
  strap_image TEXT NOT NULL,
  strap_price integer NOT NULL
);

CREATE TABLE strap_options (
  wid integer REFERENCES watches(wid),
  strap_id integer REFERENCES straps(strap_id),
  PRIMARY KEY (wid, strap_id)
);


INSERT INTO straps (id, strap_id, strap_name, strap_image, strap_price) 
  VALUES (1, 1, 'Black Leather', 'https://s3.amazonaws.com/watch-straps/BlackLeather_BlackMatte_260x.progressive.jpg', 35);
INSERT INTO straps (id, strap_id, strap_name, strap_image, strap_price)
  VALUES (2, 2, 'Gunmetal Link', 'https://s3.amazonaws.com/watch-straps/BT01-OLGU.Back_15f2bd26-737f-4b81-acca-6894dde4e729_260x.progressive.jpg', 40);
INSERT INTO straps (id, strap_id, strap_name, strap_image, strap_price)
  VALUES (3, 3,'Camo Nylon', 'https://s3.amazonaws.com/watch-straps/Camo_copy_260x.progressive.jpg', 30);
INSERT INTO straps (id, strap_id, strap_name, strap_image, strap_price)
  VALUES (4, 4,'Charcoal Nylon', 'https://s3.amazonaws.com/watch-straps/Charcoal_Black_260x.progressive.jpg', 30);
INSERT INTO straps (id, strap_id, strap_name, strap_image, strap_price)
  VALUES (5, 5, 'Tan Leather', 'https://s3.amazonaws.com/watch-straps/TanLeather_BlackBrushed_260x.progressive.jpg', 35);

COPY watches (id, wid, watch_name, unique_name, series, size, watch_price) FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchPGData1.csv' CSV HEADER;
COPY watches (id, wid, watch_name, unique_name, series, size, watch_price) FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchPGData2.csv' CSV HEADER;
-- COPY watches FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchData2.csv' CSV;
COPY strap_options (wid, strap_id) FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedStrapPGData1.csv' CSV HEADER;
COPY strap_options (wid, strap_id) FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedStrapPGData2.csv' CSV HEADER;
-- COPY strap_options FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedStrapData2.csv' CSV;


-- INSERT into watches (wid, watch_name, series, size, watch_price) VALUES (100, 'Voyager Monochrome', 'Voyager', 42, 145);
-- INSERT into straps (strap_id, strap_name, strap_image, strap_price) VALUES
--   (1, 'Black Leather', 'https://s3.amazonaws.com/watch-straps/BlackLeather_BlackMatte_260x.progressive.jpg', 35),
--   (2, 'Gunmetal Link', 'https://s3.amazonaws.com/watch-straps/BT01-OLGU.Back_15f2bd26-737f-4b81-acca-6894dde4e729_260x.progressive.jpg', 40),
--   (3, 'Camo Nylon', 'https://s3.amazonaws.com/watch-straps/Camo_copy_260x.progressive.jpg', 30),
--   (4, 'Charcoal Nylon', 'https://s3.amazonaws.com/watch-straps/Charcoal_Black_260x.progressive.jpg', 30),
--   (5, 'Tan Leather', 'https://s3.amazonaws.com/watch-straps/TanLeather_BlackBrushed_260x.progressive.jpg', 35);
-- INSERT into strap_options (watch_id, strap_id) VALUES (1, 1), (1, 2), (1, 3);



/*  Execute this file from the command line by typing:
 *    mysql -u root -p < database/schema.sql
 *  
*/