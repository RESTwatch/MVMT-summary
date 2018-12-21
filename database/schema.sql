DROP DATABASE IF EXISTS MVMT;

CREATE DATABASE MVMT;

USE MVMT;

CREATE TABLE watches (
  id INT NOT NULL AUTO_INCREMENT,
  wid INT unsigned NOT NULL,
  name varchar(50) NOT NULL,
  series varchar(50) NOT NULL,
  size INT unsigned NOT NULL,
  price INT unsigned NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE straps (
  id INT NOT NULL auto_increment,
  name varchar(50) NOT NULL,
  image varchar(250) NOT NULL,
  price INT unsigned NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE strap_options (
  watch_id INT,
  strap_id INT,
  FOREIGN KEY (watch_id) REFERENCES watches(id),
  FOREIGN KEY (strap_id) REFERENCES straps(id)
);

INSERT into watches (wid, name, series, size, price) VALUES (100, "Voyager Monochrome", "Voyager", 42, 145);
INSERT into straps (name, image, price) VALUES 
  ("Black Leather", "https://s3.amazonaws.com/watch-straps/BlackLeather_BlackMatte_260x.progressive.jpg", 35), 
  ("Gunmetal Link", "https://s3.amazonaws.com/watch-straps/BT01-OLGU.Back_15f2bd26-737f-4b81-acca-6894dde4e729_260x.progressive.jpg", 40),
  ("Camo Nylon", "https://s3.amazonaws.com/watch-straps/Camo_copy_260x.progressive.jpg", 30),
  ("Charcoal Nylon", "https://s3.amazonaws.com/watch-straps/Charcoal_Black_260x.progressive.jpg", 30),
  ("Tan Leather", "https://s3.amazonaws.com/watch-straps/TanLeather_BlackBrushed_260x.progressive.jpg", 35);
INSERT into strap_options (watch_id, strap_id) VALUES (1, 1), (1, 2), (1, 3);



/*  Execute this file from the command line by typing:
 *    mysql -u root -p < database/schema.sql
 *  
*/