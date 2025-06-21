export interface CategoryType {
  id?: string
  name: string
  description?: string
  purchase?: number
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

export default class Category {
  id?: string
  name: string
  description: string
  purchase: number
  image?: string
  createdAt: Date
  updatedAt: Date

  constructor(category: CategoryType) {
    this.id = category.id || ''
    this.name = category.name || ''
    this.description = category.description || ''
    this.purchase = category.purchase || 0
    this.image = category.image || ''
    this.createdAt = category.createdAt || new Date()
    this.updatedAt = category.updatedAt || new Date()
  }

  toObject(): CategoryType {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      purchase: this.purchase,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
