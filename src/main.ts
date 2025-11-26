import cookieParser from 'cookie-parser'
import cors, {CorsOptions} from 'cors'
import dotenv from 'dotenv'
import express, {NextFunction, Request, RequestHandler, Response, Router} from 'express'
import mongoose from 'mongoose'
import 'reflect-metadata'

import {RequestedRouter} from '@/common/RequestMapping'
import {RequestController} from '@/common/controller.decorator'
import {setupSwagger} from '@/config/swagger'
import {rateLimiter} from '@/middlewares/rateLimit'

import './index'
import {errorLogger, infoLogger} from './logger'
import {handleRequest} from './middlewares'

dotenv.config()

const port = process.env.PORT ? Number(process.env.PORT) : 3000
const host = process.env.HOST ?? 'localhost'
const dbUrl: string = String(process.env.DATABASE_URL)

const ACCESS_TOKEN_EXPIRED = 7 // 7 days
const REFRESH_TOKEN_EXPIRED = 30 // 30 days

mongoose
  .connect(dbUrl)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected')
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.log('error', e)
  })

const app = express()
app.disable('x-powered-by')

const corsOptions: CorsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
setupSwagger(app)
app.use(rateLimiter)

app.use(handleRequest)

app.use(infoLogger())

const SExpressRouter = Router()

RequestedRouter.forEach(routerMeta => {
  let apiPrefix = RequestController[routerMeta.class]
  apiPrefix = apiPrefix && apiPrefix.replace(/^\//, '')
  const methodPath = routerMeta.methodPath && routerMeta.methodPath.replace(/^\//, '')

  const path = `/${apiPrefix}/${methodPath}`

  const middlewares = (routerMeta.middlewares as RequestHandler[]) || []
  // console.log('---------------', path);
  SExpressRouter[routerMeta.method](path, ...middlewares, routerMeta.propertyKey)
})

app.use('/api/v1', SExpressRouter)

// ----------------- monitor routers -----------------
const paths = SExpressRouter.stack
  .filter(layer => layer.route)
  .map(layer => ({
    // routes: Object.keys(layer?.route)?.pop(),
    path: layer?.route?.path,
  }))

// eslint-disable-next-line no-console
console.table(paths)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!')
})

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  next(new Error('Intentional Error'))
  //   throw new Error("Intentional Error");
})

app.use(errorLogger(dbUrl))

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://${host}:${port}`)
})
