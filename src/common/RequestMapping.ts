import 'reflect-metadata'
import {NextFunction, Request, RequestHandler, Response} from 'express'

interface IOptions {
  name: string
  method: Method
  middlewares?: unknown[]
}

type ChildProps = {
  class: string
  middlewares?: unknown[]
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  methodPath: string
  propertyKey: RequestHandler
  descriptor: PropertyDescriptor
}

export const RequestedRouter: ChildProps[] = []

export enum Method {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

// eslint-disable-next-line arrow-body-style
export const RequestMapping = (options: IOptions): MethodDecorator => {
  return (target, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const className = target.constructor.name

    // console.log(propertyKey, descriptor.value, "this is property key ");

    // const method = `${options.method}`.trim().toLocaleLowerCase();
    const methodPath = `${options.name}`.trim().toLocaleLowerCase()

    const child = {
      class: className,
      method: options.method,
      methodPath,
      middlewares: options.middlewares || [],
      propertyKey: descriptor.value as RequestHandler,
      descriptor: descriptor,
    }

    if (options.middlewares) {
      const middlewares = options.middlewares as RequestHandler[]

      const originalHandler = descriptor.value as RequestHandler

      child.descriptor.value = middlewares.reduce(
        (handler, middleware) => (req: Request, res: Response, next: NextFunction) => {
          middleware(req, res, err => {
            if (err) {
              return next(err)
            }
            handler(req, res, next)
          })
        },
        originalHandler,
      )
    }

    RequestedRouter.push(child)
    return descriptor
  }
}
