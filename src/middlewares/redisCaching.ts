import {NextFunction, Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {createClient} from 'redis'

const redisClient = createClient()
// eslint-disable-next-line no-console
redisClient.connect().catch(console.error)

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl

  try {
    const cacheData = await redisClient.get(key)

    if (cacheData) {
      return res.status(StatusCodes.OK).json(JSON.parse(cacheData))
    }

    const original = res.json.bind(res)

    res.json = (data: unknown): Response => {
      // Cache the response data in Redis (non-blocking, don't await)
      redisClient
        .set(key, JSON.stringify(data), {EX: 3600})
        // eslint-disable-next-line no-console
        .catch(err => console.error('Failed to cache data in Redis:', err))

      // Send the original response
      return original(data)
    }
    // Continue to the next middleware or route handler
    next()
  } catch (error) {
    next(error)
  }
}

// export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const key = req.originalUrl
//     const cacheData = await redisClient.get(key)
//     if (cacheData) {
//       return res.status(StatusCodes.OK).json(JSON.parse(cacheData))
//     }
//     console.log('Cache miss')
//     const original = res.json.bind(res)
//     res.json = (data: unknown) => {
//       redisClient.set(key, JSON.stringify(data), {EX: 3600}).catch(console.error)
//       return original(data)
//     }
//     next()
//   } catch (error) {
//     console.error('Middleware error:', error)
//     next(error)
//   }
// }
