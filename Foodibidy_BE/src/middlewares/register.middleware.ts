import { z } from 'zod'
import { validate } from '~/utils/validator'
import validator from 'validator'

export const RegisterValidator = validate(
  z
    .object({
      name: z
        .string()
        .nonempty({ message: 'Username cant be empty' })
        .min(3, { message: 'Username must have at least 3 letters' })
        .max(100, { message: 'Username must have at most 100 letters' }),

      email: z.string().nonempty({ message: 'Email cant be empty' }).email({ message: 'Invalid email address' }),

      password: z
        .string()
        .nonempty({ message: 'Password cant be empty' })
        .min(3, { message: 'Password must have at least 3 letters' })
        .max(100, { message: 'Password must have at most 100 letters' })
        .refine((val) => validator.isStrongPassword(val), {
          message:
            'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
        }),
      confirmPassword: z.string().nonempty({ message: 'Confirm Password cant be empty' }),

      dateOfBirth: z.date() // You might want to use z.date() if parsing to Date
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })
)
