import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.File({
      filename: `${__dirname}/../../../logs/error.log`,
      maxsize: 5120000,
      maxFiles: 5,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});
