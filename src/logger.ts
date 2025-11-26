import {Request, Response} from 'express'
import expressWinston from 'express-winston'
import winston from 'winston'
import 'winston-daily-rotate-file'
import 'winston-mongodb'

// Define log levels and their order
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// Custom colors for each log level
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
})

// Define the log message format for requests
const getMessage = (req: Request, res: Response): string => {
  const logData = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body,
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
  }
  return JSON.stringify(logData)
}

// MongoDB transport for error logging
const mongoErrorTransport = (uri: string) =>
  new winston.transports.MongoDB({
    db: uri,
    options: {useUnifiedTopology: true},
    collection: 'error_logs',
    metaKey: 'meta',
    level: 'error',
    expireAfterSeconds: 7 * 24 * 60 * 60,
  })

// Info Logger middleware with color-coded levels
export const infoLogger = () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({all: true}),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        filename: 'logs/log-info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize({level: true}),
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.printf(({timestamp, level, message}) => `${timestamp} ${level}: ${message}`),
    ),
    meta: true,
    msg: getMessage,
  })

// Error Logger middleware with color-coded levels
export const errorLogger = (uri: string) =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({all: true}),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        filename: 'logs/log-error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '14d',
      }),
      mongoErrorTransport(uri),
    ],
    format: winston.format.combine(
      winston.format.colorize({level: true}),
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.printf(({timestamp, level, message}) => `${timestamp} ${level}: ${message}`),
    ),
    meta: true,
    msg: getMessage,
  })
