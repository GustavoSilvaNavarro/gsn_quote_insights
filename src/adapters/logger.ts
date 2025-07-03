import { ENVIRONMENT, LOG_LEVEL } from '@config';
import pino from 'pino';

const pinoConfiguration: pino.LoggerOptions = {
  level: LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
};

if (!['prd', 'stg'].includes(ENVIRONMENT)) {
  pinoConfiguration.transport = { target: 'pino-pretty', options: { colorize: true } };
} else {
  pinoConfiguration.formatters = {
    bindings: () => {
      return { node_version: process.version };
    },
    level: (label) => {
      return { severity: label.toUpperCase() };
    },
  };
}

export default pino(pinoConfiguration);
