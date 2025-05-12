export interface ReviewType {
  id?: string
  account_id: string
  dish_id: string
  rating: number
  comment: string
  created_at?: Date
  updated_at?: Date
}

export default class Review {
  id?: string
  account_id: string
  dish_id: string
  rating: number
  comment: string
  created_at?: Date
  updated_at?: Date

  constructor(review: ReviewType) {
    this.id = review.id
    this.account_id = review.account_id
    this.dish_id = review.dish_id
    this.rating = review.rating
    this.comment = review.comment
    this.created_at = review.created_at
    this.updated_at = review.updated_at
  }

  toObject(): ReviewType {
    return {
      id: this.id,
      account_id: this.account_id,
      dish_id: this.dish_id,
      rating: this.rating,
      comment: this.comment,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
