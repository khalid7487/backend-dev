import {NextFunction, Request, Response} from 'express'
import expressWinston from 'express-winston'
import winston from 'winston'
import 'winston-daily-rotate-file'
import 'winston-mongodb'

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

export const handleRequest = async (req: Request, res: Response, next: NextFunction) => {
  let correlationId = req.headers['x-correlation-id']
  if (!correlationId) {
    correlationId = Date.now().toString()
    req.headers['x-correlation-id'] = correlationId
  }

  res.set('x-correlation-id', correlationId)

  return next()
}

// Configure MongoDB transport for error logging
const mongoErrorTransport = (uri: string) =>
  new winston.transports.MongoDB({
    db: uri,
    options: {useUnifiedTopology: true},
    collection: 'error_logs',
    metaKey: 'meta',
    level: 'error',
    expireAfterSeconds: 7 * 24 * 60 * 60,
  })

// Info Logger middleware
export const infoLogger = () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: 'logs/log-info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.json(),
    ),
    meta: false,
    msg: getMessage,
  })

// Error Logger middleware
export const errorLogger = (uri: string) =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: 'logs/log-error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        maxSize: '20m',
        maxFiles: '14d',
      }),
      mongoErrorTransport(uri),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.json(),
    ),
    meta: false,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
  })
