#!/usr/bin/python

import Adafruit_DHT
sensor = Adafruit_DHT.DHT11
pin = 10
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

if humidity is not None and temperature is not None:
    print '{0:0.1f}|{1:0.1f}'.format(temperature, humidity)
else:
    print '0|0' 
