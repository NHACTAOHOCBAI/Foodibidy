import { z } from 'zod'
import { validate } from '~/utils/validator'

export const CreateCategoryValidator = validate(
  z.object({
    name: z.string().min(3, 'Category name must has at least 3 letters'),
    image: z.string(),
    description: z.string().optional()
  })
)
