
# ESP32 - Device

  

This repository contains the program to be included in the TTGO LoRa v2.1.6 for AAAS.

  

The project has been developed used platfom.io using Ardunio framework.

It supports two monitoring devices that will communicate through LoRa:

- Weather Station

- Plant Monitoring


## **Prototyping board**

The prototyping board selected for creating the field devices has been [TTGO ESP32 LORA 2.1.6](https://github.com/LilyGO/TTGO-LoRa32-V2.1). This board is a SX1276 chip based on ESP32 WIFI, namely LoRa remote modem, 868 MHz frequency that is the required in the EU context, high sensitivity, output power, high reliability and long transmission distance. It has been selected due to its low cost, around 25$ and the huge support offered by the internet community to solutions based on this board. Although this board has severe problems with the quality of the LoRa communication provided (up to 200m) and a problem with the charging circuit, but for the purposes of the prototype it’s enough.


## **Sensors**

**BME280**

The BME280 is an environmental sensor able to provide accurate air humidity, atmospheric pressure and temperature measures. It supports several ways of working but the most basic one will be used in this case.

 - Interface: I²C & SPI
 - Supply Voltage: 1.71-3.6V
 - Temperature Range: -40 to +85°C
 - Humidity Range: 0-100% rel. humidity
 - Pressure Range: 300-1100hPa

**Si7021**

The Si7021 is a humidity and temperature sensor with low power consumption.

 - Interface: I²C & SPI
 - Supply Voltage: 1.71-3.6V
 - Precision Relative Humidity Sensor ± 3% RH (max), 0–80% RH
 - High Accuracy Temperature Sensor ±0.4 °C (max), –10 to 85 °C

**BH1750**

The BH1750 is a digital ambient light sensor with I2C bus interface.

 - Interface: I2C
 - Power Supply: 3.3V - 5V
 - Light Range：0 - 65535 (Lux)

**VEML6070**

The VEML6070 is an advanced ultraviolet (UV) light sensor with I2C support.

 - Interface: I2C
 - Supply Voltage: 2,7 V - 5 V
 - Angle: +-62,5º.
 - Wave-length range: 270 - 290 nm.
 - Immunity on fluorescent light flicker software shutdown mode control

**Capacitive Soil Moisture Sensor**

It is a sensor able to measure soil moisture levels by capacitive sensing rather than resistive sensing like other sensors on the market. Its main characteristics are:

 - Interface: Analog
 - Operating Voltage: 3.3 ~ 5.5 VDC
 - Output Voltage: 0 ~ 3.0VDC

**Rain Sensor Module**

This sensor is a resistive dipole that shows less resistance when wet and more resistance when dry. When there is no rain drop on board it increases the Resistance so it provides high voltage according to V=IR. Its main characteristics are:

 - Interface: Analog
 - Operating Voltage: 3.3 ~ 5.5 VDC
 - Output Voltage: 0 ~ 3.0VDC
 - Includes potentiometer for adjustment.


## IoT Devices

Both of them use the TTGO LoRa v2.1.6 board and the required sensors have been included in order to obtain the required measures.

### Plant Monitoring device

**Plant Monitoring device**
 - TTGO LoRa v2.1.6
 - Si021
 - BH1750
 - SM module

|  | ESP32 |SI7021|BH1750|Soil Moisture Sensor|
|--|--|--|--|--|
|VCC|3.3V|VCC|VCC|VCC|
|GND|GND|GND|GND|GND|
|SCL|IO22|SCL|SCL||
|SDA|IO21|SDA|SDA||
|ANALOG IN|IO15|||ANALOG IN|

**Weather station device**

 - TTGO LoRa v2.1.6
 - BME280
 - BH1750
 - VEML6070
 - Rain Module

|  | ESP32 |BME280|BH1750|VEML6070|Soil Moisture Sensor|
|--|--|--|--|--|--|
|VCC|3.3V|VCC|VCC|VCC|VCC
|GND|GND|GND|GND|GND|GND
|SCL|IO22|SCL|SCL|SCL||
|SDA|IO21|SDA|SDA|SDA||
|ANALOG IN|IO15|||ANALOG IN|

## LoRa Platform

The LoRa platform used in the prototype is composed by the [RAK831](https://www.rakwireless.com/en/WisKeyOSH/RAK831) Lora radio front-end module from RAK Wireless  running on a Raspberry Pi 3B with the opensource [loraserver.io](https://www.loraserver.io/lora-gateway-os/overview/) platform installed.

The LoRa platform has required of configuration and a little development. It has been required to configure the communication with the RAK 831 gateway hat. And once the Lora Server was able to communicate with the hat, an application has been created and configured in order to allow to communicate with the edge device.


First of all, it has been required to configure the LoRa gateway component to connect to the gateway hat. This has been done using the tool provided by loraserver.io. In this case, is only required to define the correspondent frequency plan, in this case EU-868.

Once the gateway was configured, the LoRa Application Server Web App provided by loraserver.io has been used for creating the required infrastructure. The process followed has been:

 1. Creation of an organization (organization)
 2. Creation of a gateway-profile and the correspondent gateway in order to allow the communication between the gateway and the application server.
 3. Creation of the device profiles for the ESP32 devices. 
 4. LoraWAN version:1.0.2
 5. LoraWAN regional parameters: B
 6. Join method: OTAA
 7. Device class type: A
 8. Creation of the application (application). In this case is important to get the identifier assigned by the LoRa server since it will be required for subscribing to the correct subject in the MQTT broker used for integration.
 9. Creation of the devices inside the application providing the Device and generating the ApplicationKey for the device required during the join process.
 10. Implementation of the functions responsible of coding and decoding the uplink and downlink data.

## Uplink

The devices send two types of messages:

- status, with included sensor status

- data, with measured data  

## message format

  

measuretype(status|data)#sensorType(1|2)#values(with ':' for splitting values)

### Weather:

  

status#2#BME280:1#VEML6070:1#BH1750:1#RAIN:1

data#2#1.67#0#39.58#939.66#28.01#0

  

### Plant:

  

status#1#SI7021:1#BI1750:1#SM:1

data#1#13.33#38.24#28.06#4

## Downlink

The devices support commands for changing the periods applied to sampling, status sending and data sending.

  

sampling:value(in seconds)

  

sending:value(in seconds)

  

status:value(in seconds)

  
  
  

### Sample messages

  

WEATHER STATUS

  

{

"applicationID": "2",

"applicationName": "application",

"deviceName": "TTGO-WEATHER",

"devEUI": "6d3512d0c41ef44d",

"rxInfo": [

{

"gatewayID": "b827ebfffe9fadaa",

"name": "gateway",

"time": "2019-06-25T08:43:38.512447Z",

"rssi": -43,

"loRaSNR": 7,

"location": {

"latitude": 40.38486,

"longitude": -3.60689,

"altitude": 698

}

}

],

"txInfo": {

"frequency": 868500000,

"dr": 5

},

"adr": true,

"fCnt": 23,

"fPort": 1,

"data": "c3RhdHVzIzIjQk1FMjgwOjEjVkVNTDYwNzA6MSNCSDE3NTA6MSNSQUlOOjE=",

"object": {

"BH1750": true,

"BME280": true,

"RAIN": true,

"VEML6070": true,

"content": "status",

"gwDate": "2019-06-25T08:42:52.000Z",

"type": "WEATHER"

}

}

  

WEATHER data

  

{

"applicationID": "2",

"applicationName": "application",

"deviceName": "TTGO-WEATHER",

"devEUI": "6d3512d0c41ef44d",

"rxInfo": [

{

"gatewayID": "b827ebfffe9fadaa",

"name": "gateway",

"time": "2019-06-25T08:46:48.414003Z",

"rssi": -41,

"loRaSNR": 10.5,

"location": {

"latitude": 40.38486,

"longitude": -3.60701,

"altitude": 692

}

}

],

"txInfo": {

"frequency": 868300000,

"dr": 5

},

"adr": true,

"fCnt": 41,

"fPort": 1,

"data": "ZGF0YSMyIzIuNTAjMCMzOS42MyM5MzkuNjUjMjguMjYjMA==",

"object": {

"content": "data",

"gwDate": "2019-06-25T08:45:56.908Z",

"humidity": 39.63,

"luminity": 2.5,

"pressure": 939.65,

"rain": 0,

"temperature": 28.26,

"type": "WEATHER",

"uv": 0

}

}

  
  

PLANT STATUS

  

{

"applicationID": "2",

"applicationName": "application",

"deviceName": "TTGO-PLANT",

"devEUI": "ead31f10c9610e41",

"rxInfo": [

{

"gatewayID": "b827ebfffe9fadaa",

"name": "gateway",

"time": "2019-06-25T08:59:34.632114Z",

"rssi": -45,

"loRaSNR": 9,

"location": {

"latitude": 40.38506,

"longitude": -3.60707,

"altitude": 708

}

}

],

"txInfo": {

"frequency": 868300000,

"dr": 5

},

"adr": true,

"fCnt": 4,

"fPort": 1,

"data": "c3RhdHVzIzEjU0k3MDIxOjEjQkkxNzUwOjEjU006MQ==",

"object": {

"BI1750": true,

"SI7021": true,

"SM": true,

"content": "status",

"gwDate": "2019-06-25T08:58:50.131Z",

"type": "PLANT"

}

}

  

PLANT MEASURES

  

{

"applicationID": "2",

"applicationName": "application",

"deviceName": "TTGO-PLANT",

"devEUI": "ead31f10c9610e41",

"rxInfo": [

{

"gatewayID": "b827ebfffe9fadaa",

"name": "gateway",

"time": "2019-06-25T09:07:27.865394Z",

"rssi": -45,

"loRaSNR": 9.5,

"location": {

"latitude": 40.38496,

"longitude": -3.60705,

"altitude": 695

}

}

],

"txInfo": {

"frequency": 868300000,

"dr": 5

},

"adr": true,

"fCnt": 25,

"fPort": 1,

"data": "ZGF0YSMxIzYuNjcjMzcuODcjMjguMTEjMw==",

"object": {

"content": "data",

"gwDate": "2019-06-25T09:06:46.369Z",

"humidity": 37.87,

"light": 6.67,

"sm": 3,

"temperature": 28.11,

"type": "PLANT"

}

}