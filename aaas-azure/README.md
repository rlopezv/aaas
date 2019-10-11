## DevOps

This repository contains required information for implementing the DevOps tasks related with AAAS.

Since the edge modules will be executed on a rPi and Azure DevOps does not provide a hosted building agent for ARM. It's required to create and configure one.


## Install the iotedge environtment in the rPi.


### Download and install the standard libiothsm implementation

curl -L https://aka.ms/libiothsm-std-linux-armhf-latest -o libiothsm-std.deb && sudo dpkg -i ./libiothsm-std.deb

  

### Download and install the IoT Edge Security Daemon

curl -L https://aka.ms/iotedged-linux-armhf-latest -o iotedge.deb && sudo dpkg -i ./iotedge.deb

  
### Run apt-get fix

sudo apt-get install -f

## Install Docker

### Download and install the moby-engine

curl -L https://aka.ms/moby-engine-armhf-latest -o moby_engine.deb && sudo dpkg -i ./moby_engine.deb

  

### Download and install the moby-cli

curl -L https://aka.ms/moby-cli-armhf-latest -o moby_cli.deb && sudo dpkg -i ./moby_cli.deb

  
### Run apt-get fix

sudo apt-get install -f

### Install python

sudo apt install python-pip

sudo apt-get install python2.7-dev libffi-dev libssl-dev -y

### Install azure-cli

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
