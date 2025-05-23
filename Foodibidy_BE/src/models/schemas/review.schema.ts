export interface ReviewType {
  id?: string
  userId: string
  dishId: string
  rating: number
  comment: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export default class Review {
  id?: string
  userId: string
  dishId: string
  rating: number
  comment: string
  createdAt?: Date | string
  updatedAt?: Date | string

  constructor(review: ReviewType) {
    this.id = review.id || ''
    this.userId = review.userId
    this.dishId = review.dishId
    this.rating = review.rating
    this.comment = review.comment
    this.createdAt = review.createdAt
    this.updatedAt = review.updatedAt
  }

  toObject(): ReviewType {
    return {
      id: this.id,
      userId: this.userId,
      dishId: this.dishId,
      rating: this.rating,
      comment: this.comment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
