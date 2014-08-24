#!/bin/bash
#
# build_database.sh - create empty temperature database schema for to log temperature in.
#
# Tom Holderness 22/01/2012
sqlite3 piTemps.db 'DROP TABLE temperature_records;'
sqlite3 piTemps.db "CREATE TABLE temperature_records(timestamp DATETIME DEFAULT (datetime('now','localtime')), temp_sensor1 real, temp_sensor2, humi_sensor2);" 
