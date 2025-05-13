import { z } from 'zod'
import { validate } from '~/utils/validator'

export const CreateCategorySchema = validate(
  z.object({
    name: z.string().min(3, 'Category name must has at least 3 letters'),
    image: z.string().url('Image is not right'),
    description: z.string().optional()
  })
)
