import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateReviewReqBody, UpdateReviewReqBody } from '~/models/requests/review.request'
import Review from '~/models/schemas/review.schema'
import { REVIEW_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

class ReviewService {
  private reviewCollection = databaseService.reviews

  async createReview(data: CreateReviewReqBody) {
    try {
      const newReview = new Review({
        ...data
      }).toObject()

      const docRef = await this.reviewCollection.add(newReview)
      console.log('Review created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating review:', error)
      throw new Error(`Failed to create review: ${error}`)
    }
  }

  async getReview(id: string) {
    const doc = await this.reviewCollection.doc(id).get()
    if (doc.exists) {
      console.log(`Get review success with ID ${doc.id}`)
      return { id: doc.id, ...doc.data() } as Review
    }
    throw new ErrorWithStatus({ message: REVIEW_MESSAGES.REVIEW_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateReview(id: string, data: UpdateReviewReqBody) {
    const doc = await this.reviewCollection.doc(id).get()

    if (!doc.exists) {
      throw new ErrorWithStatus({ message: REVIEW_MESSAGES.REVIEW_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    const updatedReview = {
      ...data,
      updated_at: new Date()
    }

    try {
      await this.reviewCollection.doc(id).update(updatedReview)
      console.log(`Update review success with ID ${doc.id}`)
    } catch (error) {
      console.error('Error updating review:', error)
      throw new ErrorWithStatus({ message: REVIEW_MESSAGES.REVIEW_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteReview(id: string) {
    try {
      await this.reviewCollection.doc(id).delete()
      console.log(`Review with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting review with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: REVIEW_MESSAGES.REVIEW_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getAllReviews(): Promise<Review[]> {
    try {
      const snapshot = await this.reviewCollection.get()
      const reviews: Review[] = []
      snapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() } as Review)
      })
      console.log('All reviews:', reviews)
      return reviews
    } catch (error) {
      console.error('Error getting all reviews:', error)
      throw new Error(`Failed to get all reviews: ${error}`)
    }
  }
}

const reviewService = new ReviewService()
export default reviewService
