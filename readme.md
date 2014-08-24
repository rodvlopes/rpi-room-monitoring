RPi Room Monitoring
===================

Web project to read data from rpi DS18B20 module, DHT11 and present as a graphic 

Depends on
----------

Ruby 2+
Python 2.7+
Adafruit_Python_DHT python module
w1_therm rpi linux module
sqlite3 
sqlite3 ruby gem

Cron job
--------
1 * * * * /bin/bash -l -c 'cd /projectDir; ./read_sensors.rb > /root/cronlog 2>&1; ./generate_json.rb > /projectDir/webapp/data.json'