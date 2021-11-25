import { createLogger, format, transports } from 'winston';
import config from '../config';

const {
  combine,
  colorize,
  errors,
  label,
  simple,
  splat,
  timestamp,
  printf,
} = format;

const logger = createLogger({
  level: config.logLevel,
  format: combine(
    splat(),
    simple(),
    colorize(),
    label({ label: 'server' }),
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(
      ({ level, message, label: printLabel, timestamp: printTimestamps }) => {
        return `[${printLabel as string}:${level}] ${message} (${printTimestamps as string})`;
      },
    ),
  ),
  transports: [new transports.Console()],
});

export default logger;
