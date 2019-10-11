

# AAAS API Functions

This respository contains the functions implemented in order to provide and API to interact with the system
It includes several functions that implement a simple GET on the main entities and an special fucntions that allows to obtain the devices and modules installed and send commands to the modules deployed on the edge devices.

**alertFunction**, implementing REST GET service for alerts.

**plantFunction**, implementing REST GET service for telemetry.

**weatherFunction**, implementing REST GET service for telemetry.

**commandFunction**, implementing a GET that provides information about the devices connected to the IoTHub and a post method allowing to invoke the remote methods published by the modules included in the edge.
Method invocation body JSON Schema:

    {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "properties": {
        "moduleId": {
          "type": "string"
        },
        "methodName": {
          "type": "string"
        },
        "payload": {
          "type": "object"
        }
      },
      "required": [
        "moduleId",
        "methodName",
        "payload"
      ]
    }

**statusFunction**, implementing REST GET service for alerts for every device.

**API Examples:**
*Alerts*
Get:

    https://aaas-api-app.azurewebsites.net/api/alert/TTGO-PLANT/2

Response:

    [
        {
            "odata.etag": "W/\"datetime'2019-07-05T21%3A13%3A14.008609Z'\"",
            "PartitionKey": "DATA",
            "RowKey": "8437638806059_b34ad880-9f69-11e9-95a5-a17e6b072687",
            "Timestamp": "2019-07-05T21:13:14.008609Z",
            "device": "TTGO-PLANT",
            "application": "application",
            "gateway": "gateway",
            "device_id": "ead31f10c9610e41",
            "device_type": "PLANT",
            "status": false,
            "gateway_time@odata.type": "Edm.DateTime",
            "gateway_time": "2019-07-05T21:13:16.736Z",
            "edge_time@odata.type": "Edm.DateTime",
            "edge_time": "2019-07-05T21:13:13.509Z",
            "type": "DATA",
            "data": "{\"content\":\"data\",\"humidity\":21.49,\"light\":23.33,\"sm\":9,\"temperature\":30.29}",
            "message": "Low Soil Moisture",
            "server_time@odata.type": "Edm.DateTime",
            "server_time": "2019-07-05T21:13:13.941Z"
        },
        {
            "odata.etag": "W/\"datetime'2019-07-05T10%3A29%3A37.2870422Z'\"",
            "PartitionKey": "DATA",
            "RowKey": "8437677422753_c9ed9ff0-9f0f-11e9-b1e4-d9ecbc2a420f",
            "Timestamp": "2019-07-05T10:29:37.2870422Z",
            "device": "TTGO-PLANT",
            "application": "application",
            "gateway": "gateway",
            "device_id": "ead31f10c9610e41",
            "device_type": "PLANT",
            "status": false,
            "gateway_time@odata.type": "Edm.DateTime",
            "gateway_time": "2019-07-05T10:30:04.242Z",
            "edge_time@odata.type": "Edm.DateTime",
            "edge_time": "2019-07-05T10:29:36.795Z",
            "type": "DATA",
            "data": "{\"content\":\"data\",\"humidity\":30.88,\"light\":36.67,\"sm\":5,\"temperature\":29.61}",
            "message": "Low Soil Moisture",
            "server_time@odata.type": "Edm.DateTime",
            "server_time": "2019-07-05T10:29:37.247Z"
        }
    ]

*Command*
IoTHub devices
GET All devices

    https://aaas-api-app.azurewebsites.net/api/command

Response:

    [
        {
            "deviceId": "myEdgeDevice",
            "modules": [
                {
                    "moduleId": "$edgeAgent",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "$edgeHub",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "tempSensor",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "SampleModule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-06-10T09:43:39.4659453"
                },
                {
                    "moduleId": "nodered",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "logmodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-06-16T15:30:49.6692957"
                },
                {
                    "moduleId": "plantmodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-03T09:43:00.2049573"
                },
                {
                    "moduleId": "premiumplantmodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-03T09:40:21.9151456"
                },
                {
                    "moduleId": "messagedispatchermodule",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "mariadb",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "target",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "input",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "weathermodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-03T09:42:00.173377"
                },
                {
                    "moduleId": "weatherpremiummodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-06-17T11:12:01.9413245"
                },
                {
                    "moduleId": "pg",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "postgres",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "premiumweathermodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-03T09:40:46.6513326"
                },
                {
                    "moduleId": "statusmodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-03T09:43:11.4706946"
                }
            ]
        },
        {
            "deviceId": "aaas-edge-mqtt",
            "modules": [
                {
                    "moduleId": "$edgeAgent",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "$edgeHub",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "SampleModule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-06-11T18:41:08.6377844"
                },
                {
                    "moduleId": "edgenodered",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-06-11T18:41:08.4659034"
                }
            ]
        },
        {
            "deviceId": "rpi-azure-premium",
            "modules": [
                {
                    "moduleId": "$edgeAgent",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "$edgeHub",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "nodered",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "postgres",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "premiumplantmodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-05T10:29:36.8809152"
                },
                {
                    "moduleId": "premiumweathermodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-05T10:29:28.0995672"
                },
                {
                    "moduleId": "messagedispatchermodule",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "statusmodule",
                    "state": "Disconnected",
                    "lastActivityTime": "2019-07-05T10:31:43.7011243"
                }
            ]
        },
        {
            "deviceId": "aaas-edge-dev",
            "modules": [
                {
                    "moduleId": "$edgeAgent",
                    "state": "Connected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "$edgeHub",
                    "state": "Connected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "postgres",
                    "state": "Disconnected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "messagedispatchermodule",
                    "state": "Connected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "premiumweathermodule",
                    "state": "Connected",
                    "lastActivityTime": "2019-07-05T22:23:49.3899768"
                },
                {
                    "moduleId": "statusmodule",
                    "state": "Connected",
                    "lastActivityTime": "2019-07-05T22:23:50.7493461"
                },
                {
                    "moduleId": "premiumplantmodule",
                    "state": "Connected",
                    "lastActivityTime": "2019-07-05T22:23:46.8275231"
                },
                {
                    "moduleId": "nodered",
                    "state": "Connected",
                    "lastActivityTime": "0001-01-01T00:00:00"
                },
                {
                    "moduleId": "weathermodule",
                    "state": "Connected",
                    "lastActivityTime": "2019-07-05T22:15:00.261896"
                },
                {
                    "moduleId": "plantmodule",
                    "state": "Connected",
                    "lastActivityTime": "2019-07-05T22:15:00.6994185"
                }
            ]
        }
    ]

Send Cloud to Edge command (config)
POST:

    https://aaas-api-app.azurewebsites.net/api/command/aaas-edge-dev

Body:

    {
    	"moduleId" : "premiumweathermodule",
    	"methodName" : "config",
    	"payload" : {"zambrettiConf":{"defaultWind":1}}
    }
    
Response

    {
        "status": 200,
        "payload": {
            "result": {
                "message": "updated",
                "data": "{\"newConf\":{\"pressureUpper\":995,\"pressureLower\":1005,\"hemisphere\":1,\"defaultWind\":1,\"trendLevel0\":2,\"trendLevel1\":10}}"
            }
        }
    }

Send Cloud to Device Command
POST

    https://aaas-api-app.azurewebsites.net/api/command/aaas-edge-dev

Body:

    {
    	"moduleId" : "messagedispatchermodule",
    	"methodName" : "command",
    	"payload" : {"device_id": "ead31f10c9610e41",
    				 "command" : "sending",
    				 "value" : 60
    	}
    }
  Response:
 

     {
        "status": 200,
        "payload": "command sent"
    }





