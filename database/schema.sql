
CREATE SCHEMA summary;

CREATE TABLE watches (
  id SERIAL PRIMARY KEY,
  wid integer NOT NULL,
  watch_name TEXT NOT NULL,
  series TEXT NOT NULL,
  size integer NOT NULL,
  watch_price integer NOT NULL,
);

CREATE TABLE straps (
  id SERIAL NOT NULL,
  strap_id integer NOT NULL PRIMARY KEY,
  strap_name TEXT NOT NULL,
  strap_image TEXT NOT NULL,
  strap_price integer NOT NULL
);

CREATE TABLE strap_options (
  watch_id integer REFERENCES watches(id),
  strap_id integer REFERENCES straps(strap_id)
);

-- INSERT into watches (wid, watch_name, series, size, watch_price) VALUES (100, 'Voyager Monochrome', 'Voyager', 42, 145);
INSERT into straps (strap_id, strap_name, strap_image, strap_price) VALUES
  (1, 'Black Leather', 'https://s3.amazonaws.com/watch-straps/BlackLeather_BlackMatte_260x.progressive.jpg', 35),
  (2, 'Gunmetal Link', 'https://s3.amazonaws.com/watch-straps/BT01-OLGU.Back_15f2bd26-737f-4b81-acca-6894dde4e729_260x.progressive.jpg', 40),
  (3, 'Camo Nylon', 'https://s3.amazonaws.com/watch-straps/Camo_copy_260x.progressive.jpg', 30),
  (4, 'Charcoal Nylon', 'https://s3.amazonaws.com/watch-straps/Charcoal_Black_260x.progressive.jpg', 30),
  (5, 'Tan Leather', 'https://s3.amazonaws.com/watch-straps/TanLeather_BlackBrushed_260x.progressive.jpg', 35);
-- INSERT into strap_options (watch_id, strap_id) VALUES (1, 1), (1, 2), (1, 3);



/*  Execute this file from the command line by typing:
 *    mysql -u root -p < database/schema.sql
 *  
*/