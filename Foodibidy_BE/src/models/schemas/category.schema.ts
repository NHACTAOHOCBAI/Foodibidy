export interface CategoryType {
    name: string
    description?: string
    restaurant_id?: string | null
    created_at?: Date
}

export default class Category {
    name: string
    description: string
    restaurant_id: string | null
    created_at: Date

    constructor(category: CategoryType) {
        this.name = category.name || ''
        this.description = category.description || ''
        this.restaurant_id = category.restaurant_id ?? null
        this.created_at = category.created_at || new Date()
    }

    toObject(): CategoryType {
        return {
            name: this.name,
            description: this.description,
            restaurant_id: this.restaurant_id,
            created_at: this.created_at
        }
    }
}
