#! /usr/bin/env ruby
require 'sqlite3'
require 'json'

db = SQLite3::Database.new "piTemps.db"
data=db.execute( "select strftime('%s',timestamp) || '000', value from temperature_records" )
puts data.to_json
