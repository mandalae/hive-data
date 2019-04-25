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
      host: "https://2500:" + process.env.LOKI_API_KEY + "@logs-us-west1.grafana.net/api/prom/push"
    }),
    new winston.transports.File({ filename: 'hive-data.log' })
  ]
};
const logger = createLogger(options);

module.exports = logger;
