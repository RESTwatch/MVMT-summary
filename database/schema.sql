DROP DATABASE IF EXISTS MVMT;

CREATE DATABASE MVMT;

USE MVMT;

CREATE TABLE watches (
  id int NOT NULL AUTO_INCREMENT,
  wid int unsigned NOT NULL,
  name varchar(50) NOT NULL,
  series varchar(50) NOT NULL,
  size int unsigned NOT NULL,
  price int unsigned NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE straps (
  id int NOT NULL auto_increment,
  name varchar(50) NOT NULL,
  image varchar(150) NOT NULL,
  price int unsigned NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE watches_straps (

)

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u root -p < schema.sql
 *  
*/
