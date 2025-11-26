import {AnyObjectSchema, InferType, ValidationError} from 'yup'

type ValidateSchema<S extends AnyObjectSchema> = {
  data: object
  schema: S
}

export const validateSchema = async <S extends AnyObjectSchema>({
  data,
  schema,
}: ValidateSchema<S>): Promise<{
  errors?: Partial<Record<keyof InferType<S>, string[]>>
  validatedData?: InferType<S>
}> => {
  try {
    const validatedData = await schema.validate(data, {abortEarly: false})
    return {validatedData}
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors: Partial<Record<keyof InferType<S>, string[]>> = {}
      error.inner.forEach(err => {
        const path = err.path as keyof InferType<S>
        if (path && !errors[path]) {
          errors[path] = []
        }
        errors[path]?.push(err.message)
      })

      return {errors}
    }
    throw error
  }
}
