import { ZodSchema } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errorMessages = result.error.errors.map((e) => e.message)
      return res.status(400).json({ errors: errorMessages })
    }

    req.body = result.data
    next()
  }
}
