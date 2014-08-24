#! /usr/bin/env ruby
#https://github.com/benlund/ascii_charts
require 'ascii_charts'
require 'sqlite3'

db = SQLite3::Database.new "piTemps.db"

puts 'consutlando a tabela'
data=[]
db.execute( "select strftime('%d/%m %H:%M', timestamp), value from temperature_records" ) do |row|
  p row
  data << row
end

puts AsciiCharts::Cartesian.new(data).draw

