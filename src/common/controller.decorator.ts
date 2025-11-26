import 'reflect-metadata'

export const RequestController: Record<string, string> = {}

// eslint-disable-next-line arrow-body-style
const Controller = (base_path: string): ClassDecorator => {
  return target => {
    RequestController[target.name] = base_path
  }
}

export default Controller
