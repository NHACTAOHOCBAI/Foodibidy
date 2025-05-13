export interface CategoryType {
  name: string
  description?: string
  purchase?: number
  image?: string
  created_at?: Date
  updated_at?: Date
}

export default class Category {
  name: string
  description: string
  purchase: number
  image: string
  created_at: Date
  updated_at: Date

  constructor(category: CategoryType) {
    this.name = category.name || ''
    this.description = category.description || ''
    this.purchase = category.purchase || 0
    this.image = category.image || ''
    this.created_at = category.created_at || new Date()
    this.updated_at = category.updated_at || new Date()
  }

  toObject(): CategoryType {
    return {
      name: this.name,
      description: this.description,
      purchase: this.purchase,
      image: this.image,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
