
CREATE SCHEMA summary;

CREATE TABLE watches (
  id SERIAL PRIMARY KEY,
  wid INT NOT NULL,
  watch_name TEXT NOT NULL,
  series TEXT NOT NULL,
  size INT NOT NULL,
  watch_price INT NOT NULL
);

CREATE TABLE straps (
  id SERIAL PRIMARY KEY,
  strap_name TEXT NOT NULL,
  strap_image TEXT NOT NULL,
  strap_price INT NOT NULL
);

CREATE TABLE strap_options (
  watch_id INT,
  strap_id INT,
  FOREIGN KEY (watch_id) REFERENCES watches(id),
  FOREIGN KEY (strap_id) REFERENCES straps(id)
);

INSERT into watches (wid, watch_name, series, size, watch_price) VALUES (100, 'Voyager Monochrome', 'Voyager', 42, 145);
INSERT into straps (strap_name, strap_image, strap_price) VALUES 
  ('Black Leather', 'https://s3.amazonaws.com/watch-straps/BlackLeather_BlackMatte_260x.progressive.jpg', 35), 
  ('Gunmetal Link', 'https://s3.amazonaws.com/watch-straps/BT01-OLGU.Back_15f2bd26-737f-4b81-acca-6894dde4e729_260x.progressive.jpg', 40),
  ('Camo Nylon', 'https://s3.amazonaws.com/watch-straps/Camo_copy_260x.progressive.jpg', 30),
  ('Charcoal Nylon', 'https://s3.amazonaws.com/watch-straps/Charcoal_Black_260x.progressive.jpg', 30),
  ('Tan Leather', 'https://s3.amazonaws.com/watch-straps/TanLeather_BlackBrushed_260x.progressive.jpg', 35);
INSERT into strap_options (watch_id, strap_id) VALUES (1, 1), (1, 2), (1, 3);



/*  Execute this file from the command line by typing:
 *    mysql -u root -p < database/schema.sql
 *  
*/