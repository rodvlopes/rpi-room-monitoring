#! /usr/bin/env ruby
thermfile='/sys/bus/w1/devices/28-00000433ae74/w1_slave'
#thermfile='therm.stub'
thermread=File.read(thermfile)
tempraw=thermread.split('t=')[1]
temp=tempraw.to_f/1000
puts temp

require 'sqlite3'
db = SQLite3::Database.new "piTemps.db"
db.execute "insert into temperature_records (value) values (?)", [ temp ]

