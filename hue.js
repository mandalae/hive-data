const huejay = require('huejay');
const makeRequest = require('./makeRequest');
const logger = require('./logger.js');

module.exports = () => {
    const client = new huejay.Client({
      host:     process.env.HUE_BRIDGE,
      port:     80,               // Optional
      username: process.env.HUE_USER,
      timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
    });

client.lights.getAll()
  .then(lights => {
    for (let light of lights) {
      console.log(`Light [${light.id}]: ${light.name}`);
      console.log(`  Type:             ${light.type}`);
      console.log(`  Unique ID:        ${light.uniqueId}`);
      console.log(`  Manufacturer:     ${light.manufacturer}`);
      console.log(`  Model Id:         ${light.modelId}`);
      console.log('  Model:');
      console.log(`    Id:             ${light.model.id}`);
      console.log(`    Manufacturer:   ${light.model.manufacturer}`);
      console.log(`    Name:           ${light.model.name}`);
      console.log(`    Type:           ${light.model.type}`);
      console.log(`    Color Gamut:    ${light.model.colorGamut}`);
      console.log(`    Friends of Hue: ${light.model.friendsOfHue}`);
      console.log(`  Software Version: ${light.softwareVersion}`);
      console.log('  State:');
      console.log(`    On:         ${light.on}`);
      console.log(`    Reachable:  ${light.reachable}`);
      console.log(`    Brightness: ${light.brightness}`);
      console.log(`    Color mode: ${light.colorMode}`);
      console.log(`    Hue:        ${light.hue}`);
      console.log(`    Saturation: ${light.saturation}`);
      // console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
      console.log(`    Color Temp: ${light.colorTemp}`);
      console.log(`    Alert:      ${light.alert}`);
      console.log(`    Effect:     ${light.effect}`);
      console.log();

      const normalisedName = light.name.replace(/\s/g, '_');
      logger.info('hueLightData,dataType=lightState,device=' + normalisedName + ' reportedValue=' + (light.on ? 1 : 0));
      makeRequest.saveMetric('hueLightData,dataType=lightState,device=' + normalisedName + ' reportedValue=' + (light.on ? 1 : 0)).then(data => {
          logger.info(data);
      });
    }
  });
};
