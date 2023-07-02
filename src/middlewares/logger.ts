import { createLogger, format, transports, Logger, addColors } from 'winston';

const logsDir = './logs/';

const formatters = [format.timestamp(), format.json()];

const loggerRequestTransports: transports.StreamTransportInstance[] = [
  new transports.File({
    level: 'error',
    filename: `${logsDir}requestErrors.log`,
  }),
];

if (process.env.NODE_ENV !== 'production') {
  formatters.push(format.prettyPrint());
  loggerRequestTransports.push(
    new transports.File({
      level: 'info',
      filename: `${logsDir}requestInfo.log`,
    }),
    new transports.File({
      level: 'warn',
      filename: `${logsDir}requestWarnings.log`,
    }),
    new transports.Console({
      level: 'warn',
      format: format.combine(
        ...formatters,
        format.colorize({ all: true }),
        format.printf((info) => {
          const { timestamp, message, meta } = info;
          const requestBody = JSON.stringify(meta.req.body, null, 2);
          const responseBody = JSON.stringify(meta.res.body, null, 2);
          const { statusCode } = meta.res;

          return `[${timestamp}] ${message} - ${statusCode}\n\n${
            requestBody ? `Request Body: ${requestBody}\n` : ''
          }Response Body: ${responseBody}`;
        }),
      ),
    }),
  );
  addColors({
    info: 'blue',
    error: 'red',
    warn: 'yellow',
  });
}

export const requestLogger: Logger = createLogger({
  transports: loggerRequestTransports,
  format: format.combine(...formatters),
});
