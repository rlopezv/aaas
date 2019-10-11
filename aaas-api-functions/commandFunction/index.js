const azure = require('azure-storage');
var iotHub = require('azure-iothub');
var Message = require('azure-iot-common').Message;

const tableService = azure.createTableService(process.env.AAAS_STORAGE_CONNECTION_STRING);
const tableName = "COMMAND";
const MAX_ROWS = 20;

var serviceClient = iotHub.Client.fromConnectionString(process.env.AAAS_IOTHUB_CONNECTION_STRING);
var registry = iotHub.Registry.fromConnectionString(process.env.AAAS_IOTHUB_CONNECTION_STRING);

function processExceptionMessage(e) {
    var result = {};
    if (e.responseBody) {
        var content = e.responseBody.replace(/\\/g, "");
        var from, to;
        from = content.indexOf("\"{");
        if (from>0) {
            to = content.indexOf("\"}");
            if (to>0) {
                result = JSON.parse(content.substring(from+1,to+2));
             }
        }
    }
    return result;
}
function buildDeviceInfo(device, deviceModules) {
    var result = {};
    result.deviceId = device.deviceId;
    result.modules = [];
    for (deviceModule of deviceModules) {
        var moduleInfo = {};
        moduleInfo.moduleId = deviceModule.moduleId;
        moduleInfo.state = deviceModule.connectionState;
        moduleInfo.lastActivityTime = deviceModule.lastActivityTime;
        result.modules.push(moduleInfo);
    }
    return result;
}

function buildCommand(request) {
    var result = {
        methodName: request.methodName,
        payload: request.payload,
        responseTimeoutInSeconds: 5,
        connectTimeoutInSeconds: 2
    }
    return result;
}

async function processCommand(deviceId, command) {
    var result;
    try {
        result = await serviceClient.invokeDeviceMethod(deviceId, command.moduleId, buildCommand(command));
    } catch (e) {
        return processExceptionMessage(e);
    }
    return result.result;
}

async function processDeviceInfo(deviceId) {
    try {
        var deviceResponse = await registry.get(deviceId);
        if (deviceResponse && deviceResponse.responseBody) {
            var moduleResponse = await registry.getModulesOnDevice(deviceResponse.responseBody.deviceId);
            return buildDeviceInfo(deviceResponse.responseBody, moduleResponse.responseBody);
        }
    } catch (e) {
        console.log(e.stack);
    }
    return {};
}

async function processDevicesInfo() {

    var result = [];
    var deviceResponse = await registry.list();
    for (device of deviceResponse.responseBody) {
        var moduleResponse = await registry.getModulesOnDevice(device.deviceId);
        result.push(buildDeviceInfo(device, moduleResponse.responseBody));
    }
    return result;
}

/**
 * Retrieves last stored telemetry for identified plant
 */
module.exports = async function (context, req) {

    var result;
    if ("GET" === req.method) {
        if (req.params.id) {
            result = await processDeviceInfo(req.params.id);
        } else {
            result = await processDevicesInfo();
        }
        context.res.status(200).json(result);
    } else if ("POST" == req.method) {
        result = await processCommand(req.params.id,req.body);
        context.res.status(200).json(result);
    }
};