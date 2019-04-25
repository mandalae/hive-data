const winston = require("winston");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new LokiTransport({
      host: "http://192.168.0.130:3100"
    }),
    new winston.transports.File({ filename: 'hive-data.log' })
  ]
};
const logger = createLogger(options);

module.exports = logger;
