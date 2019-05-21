const util = require('util');
const { Client } = require('tplink-smarthome-api');
const makeRequest = require('./makeRequest');
const logger = require('./logger.js');

const client = new Client();

var logEvent = function (eventName, device, state) {
  const stateString = (state != null ? util.inspect(state) : '');
  console.log(`${(new Date()).toISOString()} ${eventName} ${device.model} ${device.host}:${device.port} ${stateString}`);
};

// Look for devices, log to console, and turn them on
client.startDiscovery().on('device-new', (device) => {
    logEvent('device-new', device);
    device.startPolling(5000);

    device.on('emeter-realtime-update', (emeterRealtime) => {

        const normalisedName = device.name.replace(/\s/g, '_');

        logEvent('emeter-realtime-update', device, emeterRealtime);

        makeRequest.saveMetric('tpLinkData,dataType=powerConsumption,device=' + normalisedName + ' reportedValue=' + emeterRealtime.total_wh).then(data => {
            logger.info(data);
        });

    });
});
