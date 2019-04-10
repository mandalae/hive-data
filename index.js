'use strict';

const cron = require('node-cron');

const login = require('./login');
const getNodes = require('./getNodes');
const makeRequest = require('./makeRequest');
const logger = require('./logger.js');

let targetTemp
let currentTemp
let heatingOn = 0

if (!process.env.HIVE_USERNAME && !process.env.HIVE_PASSWORD){
    logger.error("No username and / or password set")
} else {
    cron.schedule('* * * * *', () => {
        login().then(getNodes).then((result) => {
            result.nodes.forEach(item => {
                if (item.name.indexOf('http://') == -1){
                    console.log(item.name, item.id);
                    if (item.name === 'Thermostat 1'){
                        logger.info(item.attributes);

                        heatingOn = item.attributes.stateHeatingRelay
                        targetTemp = item.attributes.targetHeatTemperature;
                        currentTemp = item.attributes.temperature;
                    } else {
                        if (item.attributes.powerConsumption){
                            logger.info('hiveData,dataType=powerConsumption,device="' + item.name + '" reportedValue=' + item.attributes.powerConsumption.reportedValue);
                            makeRequest.saveMetric('hiveData,dataType=powerConsumption,device="' + item.name + '" reportedValue=' + item.attributes.powerConsumption.reportedValue).then(data => {
                                logger.info(data);
                            });
                        }
                        if (item.attributes.state){
                            logger.info('hiveData,dataType=lightState,device="' + item.name + '" reportedValue=' + (item.attributes.state.reportedValue === 'ON' ? 1 : 0));
                            makeRequest.saveMetric('hiveData,dataType=lightState,device="' + item.name + '" reportedValue=' + (item.attributes.state.reportedValue === 'ON' ? 1 : 0)).then(data => {
                                logger.info(data);
                            });
                        }
                    }
                }
            });
            logger.info(targetTemp, currentTemp);
            logger.info("Target temperature: " + targetTemp.reportedValue);
            logger.info("Current temperature: " + currentTemp.reportedValue);
            logger.info("Heating On: " + heatingOn.reportedValue === 'ON' ? 'true' : 'false');

            makeRequest.saveMetric('hiveData,dataType=currentTemp temperature=' + currentTemp.reportedValue).then(data => {
                logger.info(data);
            });
            makeRequest.saveMetric('hiveData,dataType=targetTemp temperature=' + targetTemp.reportedValue).then(data => {
                logger.info(data);
            });
            makeRequest.saveMetric('hiveData,dataType=heatingOn heatingOn=' + (heatingOn.reportedValue === 'ON' ? 1 : 0)).then(data => {
                logger.info(data);
            });
        }).catch(err => {
            logger.error(err);
        });
    });
}
