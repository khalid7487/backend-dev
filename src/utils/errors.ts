export class GeneralError extends Error {
  public message: string

  constructor(message: string) {
    super(message)
    this.message = message
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype) // Required for built-in subclasses in TypeScript
  }

  getCode(): number {
    return 400
  }
}

export class BadRequest extends GeneralError {
  constructor(message: string) {
    super(message)
    this.name = 'BadRequest'
  }

  getCode(): number {
    return 400
  }
}

export class NotFound extends GeneralError {
  constructor(message: string) {
    super(message)
    this.name = 'NotFound'
  }

  getCode(): number {
    return 404
  }
}
