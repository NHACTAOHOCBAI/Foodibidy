import { z } from 'zod'
import { validate } from '~/utils/validator'

export const LoginValidator = validate(
  z.object({
    name: z.string().nonempty('Username cant be empty'),
    hashPassword: z.string().nonempty('Password cant be empty')
  })
)
