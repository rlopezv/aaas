
## DevOps

  

This repository contains required information for implementing the DevOps tasks related with AAAS.

  

## ARM Build Agent

Since the edge modules will be executed on a rPi and Azure DevOps does not provide a hosted building agent for ARM. It's required to create and configure one.

  
  

### Install the iotedge environment in the rPi.

  
  

#### Download and install the standard libiothsm implementation

  

    curl -L https://aka.ms/libiothsm-std-linux-armhf-latest -o libiothsm-std.deb && sudo dpkg -i ./libiothsm-std.deb

  

  

#### Download and install the IoT Edge Security Daemon

  

    curl -L https://aka.ms/iotedged-linux-armhf-latest -o iotedge.deb && sudo dpkg -i ./iotedge.deb

  

#### Run apt-get fix

  

    sudo apt-get install -f

  

### Install Docker

  

#### Download and install the moby-engine

  

    curl -L https://aka.ms/moby-engine-armhf-latest -o moby_engine.deb && sudo dpkg -i ./moby_engine.deb

  

  

### Download and install the moby-cli

  

    curl -L https://aka.ms/moby-cli-armhf-latest -o moby_cli.deb && sudo dpkg -i ./moby_cli.deb

  

### Run apt-get fix

  

    sudo apt-get install -f

  

### Install python

  

    sudo apt install python-pip
    
    sudo apt-get install python2.7-dev libffi-dev libssl-dev -y

  

### [Install azure-cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux)

  

    curl -L https://aka.ms/InstallAzureCli | bash

  

### Install Azure IoT Extension

    az extension add --name azure-cli-iot-ext
    
    sudo pip install --upgrade setuptools pip

  

### Install iotedgedev

```

pip install -U iotedgedev

```

### Configure the agent

https://devblogs.microsoft.com/iotdev/setup-azure-iot-edge-ci-cd-pipeline-with-arm-agent/

### Troubleshooting
[https://github.com/Azure/iotedgedev/wiki/manual-dev-machine-setup](https://github.com/Azure/iotedgedev/wiki/manual-dev-machine-setup)

## Deployment manifest
An example of a deployment manifest.

    {
    
    "id": "aaas-rpi-premium",
    
    "schemaVersion": null,
    
    "labels": {
    
    "service": "premium"
    
    },
    
    "content": {
    
    "modulesContent": {
    
    "$edgeAgent": {
    
    "properties.desired": {
    
    "modules": {
    
    "nodered": {
    
    "settings": {
    
    "image": "rlopezviana/aaas-edge-nodered:1.0.3-arm32v7",
    
    "createOptions": "{\"HostConfig\":{\"Privileged\":true,\"PortBindings\":{\"1880/tcp\":[{\"HostPort\":\"1880\"}]}}}"
    
    },
    
    "type": "docker",
    
    "version": "1.0",
    
    "status": "running",
    
    "restartPolicy": "always"
    
    },
    
    "postgres": {
    
    "settings": {
    
    "image": "postgres:9.6",
    
    "createOptions": "{\"Env\":[\"POSTGRES_PASSWORD=docker\",\"POSTGRES_DB=aaas_db\"],\"ExposedPorts\":{\"5432/tcp\":{}},\"HostConfig\":{\"Privileged\":true,\"PortBindings\":{\"5432/tcp\":[{\"HostPort\":\"5432\"}]},\"Binds\":[\"/aaas/pg_data:/var/lib/postgresql/data\"]}}"
    
    },
    
    "type": "docker",
    
    "version": "1.0",
    
    "env": {
    
    "POSTGRES_PASSWORD": {
    
    "value": "docker"
    
    },
    
    "POSTGRES_DB": {
    
    "value": "aaas_db"
    
    }
    
    },
    
    "status": "running",
    
    "restartPolicy": "always"
    
    },
    
    "messagedispatchermodule": {
    
    "settings": {
    
    "image": "aaascontainerregistry.azurecr.io/messagedispatchermodule:1.0.3-arm32v7",
    
    "createOptions": "{\"ExposedPorts\":{\"9229/tcp\":{}},\"HostConfig\":{\"Privileged\":true,\"PortBindings\":{\"9229/tcp\":[{\"HostPort\":\"9269\"}]}}}"
    
    },
    
    "type": "docker",
    
    "version": "1.0",
    
    "status": "running",
    
    "restartPolicy": "always"
    
    },
    
    "statusmodule": {
    
    "settings": {
    
    "image": "aaascontainerregistry.azurecr.io/statusmodule:1.0.3-arm32v7",
    
    "createOptions": ""
    
    },
    
    "type": "docker",
    
    "version": "1.0",
    
    "status": "running",
    
    "restartPolicy": "always"
    
    },
    
    "premiumweathermodule": {
    
    "settings": {
    
    "image": "aaascontainerregistry.azurecr.io/premiumweathermodule:1.0.3-arm32v7",
    
    "createOptions": ""
    
    },
    
    "type": "docker",
    
    "version": "1.0",
    
    "status": "running",
    
    "restartPolicy": "always"
    
    },
    
    "premiumplantmodule": {
    
    "settings": {
    
    "image": "aaascontainerregistry.azurecr.io/premiumplantmodule:1.0.3-arm32v7",
    
    "createOptions": ""
    
    },
    
    "type": "docker",
    
    "version": "1.0",
    
    "status": "running",
    
    "restartPolicy": "always"
    
    }
    
    },
    
    "runtime": {
    
    "settings": {
    
    "minDockerVersion": "v1.25",
    
    "registryCredentials": {
    
    "aaascontainerregistry": {
    
    "address": "aaascontainerregistry.azurecr.io",
    
    "password": "/oD/k3KDUaBwYzL8GW14SNgN/Z7aOq8t",
    
    "username": "aaasContainerRegistry"
    
    },
    
    "docker": {
    
    "address": "docker.io",
    
    "password": "rlv11Mar04",
    
    "username": "rlopezviana"
    
    }
    
    }
    
    },
    
    "type": "docker"
    
    },
    
    "schemaVersion": "1.0",
    
    "systemModules": {
    
    "edgeAgent": {
    
    "settings": {
    
    "image": "mcr.microsoft.com/azureiotedge-agent:1.0",
    
    "createOptions": ""
    
    },
    
    "type": "docker"
    
    },
    
    "edgeHub": {
    
    "settings": {
    
    "image": "mcr.microsoft.com/azureiotedge-hub:1.0",
    
    "createOptions": "{\"HostConfig\":{\"PortBindings\":{\"443/tcp\":[{\"HostPort\":\"443\"}],\"5671/tcp\":[{\"HostPort\":\"5671\"}],\"8883/tcp\":[{\"HostPort\":\"8883\"}]}}}"
    
    },
    
    "type": "docker",
    
    "env": {
    
    "OptimizeForPerformance": {
    
    "value": "false"
    
    }
    
    },
    
    "status": "running",
    
    "restartPolicy": "always"
    
    }
    
    }
    
    }
    
    },
    
    "$edgeHub": {
    
    "properties.desired": {
    
    "routes": {
    
    "mesageDispatcherModuleToPremiumWeatherModule": "FROM /messages/modules/messagedispatchermodule/outputs/weather INTO BrokeredEndpoint(\"/modules/premiumweathermodule/inputs/data\")",
    
    "mesageDispatcherModuleToPremiumPlantModule": "FROM /messages/modules/messagedispatchermodule/outputs/plant INTO BrokeredEndpoint(\"/modules/premiumplantmodule/inputs/data\")",
    
    "noderedToMessageDispatcherModule": "FROM /messages/modules/nodered/outputs/* INTO BrokeredEndpoint(\"/modules/messagedispatchermodule/inputs/message\")",
    
    "mesageDispatcherModuleToStatusModule": "FROM /messages/modules/messagedispatchermodule/outputs/status INTO BrokeredEndpoint(\"/modules/statusmodule/inputs/status\")",
    
    "mesageDispatcherModuleTonoderedModule": "FROM /messages/modules/messagedispatchermodule/outputs/command INTO BrokeredEndpoint(\"/modules/nodered/inputs/command\")",
    
    "weathermoduleToIoTHub": "FROM /messages/modules/weathermodule/outputs/* INTO $upstream",
    
    "plantmoduleToIoTHub": "FROM /messages/modules/plantmodule/outputs/* INTO $upstream",
    
    "statusmoduleToIoTHub": "FROM /messages/modules/statusmodule/outputs/* INTO $upstream",
    
    "premiumPlantModuleToIoTHub": "FROM /messages/modules/premiumplantmodule/outputs/* INTO $upstream",
    
    "premiumweathermoduleToIoTHub": "FROM /messages/modules/premiumweathermodule/outputs/* INTO $upstream"
    
    },
    
    "schemaVersion": "1.0",
    
    "storeAndForwardConfiguration": {
    
    "timeToLiveSecs": 7200
    
    }
    
    }
    
    }
    
    }
    
    },
    
    "targetCondition": "tags.service ='premium'",
    
    "createdTimeUtc": "2019-07-05T09:32:28.506Z",
    
    "lastUpdatedTimeUtc": "2019-07-05T09:32:28.506Z",
    
    "priority": 10,
    
    "systemMetrics": {
    
    "results": {
    
    "appliedCount": 1,
    
    "reportedSuccessfulCount": 0,
    
    "reportedFailedCount": 1,
    
    "targetedCount": 1
    
    },
    
    "queries": {
    
    "Targeted": "select deviceId from devices where capabilities.iotEdge = true and tags.service ='premium'",
    
    "Applied": "select deviceId from devices.modules where moduleId = '$edgeAgent' and configurations.[[aaas-rpi-premium]].status = 'Applied'",
    
    "Reporting Success": "select deviceId from devices.modules where moduleId = '$edgeAgent' and configurations.[[aaas-rpi-premium]].status = 'Applied' and properties.desired.$version = properties.reported.lastDesiredVersion and properties.reported.lastDesiredStatus.code = 200",
    
    "Reporting Failure": "select deviceId from devices.modules where moduleId = '$edgeAgent' and configurations.[[aaas-rpi-premium]].status = 'Applied' and properties.desired.$version = properties.reported.lastDesiredVersion and properties.reported.lastDesiredStatus.code != 200"
    
    }
    
    },
    
    "metrics": {
    
    "results": {},
    
    "queries": {}
    
    },
    
    "etag": "MQ=="
    
    }

