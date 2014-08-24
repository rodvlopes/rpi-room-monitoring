#! /usr/bin/env ruby

#DS18B20
thermfile='/sys/bus/w1/devices/28-00000433ae74/w1_slave' 
#thermfile='therm.stub'
thermread=File.read(thermfile)
tempdata=thermread.split('t=')[1]
s1_temp=tempdata.to_f/1000
puts "sensor1_temp: #{s1_temp}"

#DHT11
sensor2=`./dht11_read.py` 
s2_temp, s2_humi = sensor2.strip.split('|')
puts "sensor2_temp: #{s2_temp}, sensor2_humi: #{s2_humi}"

require 'sqlite3'
db = SQLite3::Database.new "piTemps.db"
db.execute "insert into temperature_records (sensor1_temp, sensor2_temp, sensor2_humi) values (?, ?, ?)", [ s1_temp, s2_temp.to_f, s2_humi.to_f ]

