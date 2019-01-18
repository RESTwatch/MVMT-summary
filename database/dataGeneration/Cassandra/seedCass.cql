DROP KEYSPACE IF EXISTS sdc;
CREATE KEYSPACE sdc
  WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE sdc;

CREATE TABLE sdc.watches
(
  id          int PRIMARY KEY,
  wid         int,
  watch_name  TEXT,
  unique_name TEXT,
  series      TEXT,
  size        int,
  watch_price int,
  strap_id1   int,
  strap_id2   int,
  strap_id3   int
);

COPY sdc.watches(id,wid,watch_name,unique_name,series,size,watch_price,strap_id1,strap_id2,strap_id3) FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchCassData1.csv' WITH DELIMITER =  ',' AND HEADER = TRUE;
COPY sdc.watches(id,wid,watch_name,unique_name,series,size,watch_price,strap_id1,strap_id2,strap_id3) FROM '/Users/miles/Desktop/Hack_Reactor/sdc/MVMT-summary/database/dataGeneration/seedWatchCassData2.csv' WITH DELIMITER =  ',' AND HEADER = TRUE;
