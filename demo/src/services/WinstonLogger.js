const winston = require('winston');
const isEmpty = require('lodash/isEmpty');

function replacer(key, value) {
  if (value instanceof Buffer) {
    return value.toString('base64');
  }

  if (value instanceof Error) {
    const object = {};
    Object.getOwnPropertyNames(value).forEach((propertyName) => {
      object[propertyName] = value[propertyName];
    });
    return object;
  }

  return value;
}

function WinstonLogger() {
  return winston.createLogger({
    exitOnError: false,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.metadata({ fillExcept: ['timestamp', 'level', 'message'] }),
      winston.format.printf((info) => {
        let string = `${info.timestamp} [${info.level}]: ${info.message}`;
        if (!isEmpty(info.metadata)) {
          string += `\n${JSON.stringify(info.metadata, replacer)}`;
        }
        return string;
      }),
    ),
    transports: [
      new winston.transports.Console(),
    ],
  });
}

module.exports = WinstonLogger;
