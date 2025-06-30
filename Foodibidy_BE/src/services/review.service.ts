import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateReviewReqBody, UpdateReviewReqBody } from '~/models/requests/review.request'
import Review, { ReviewType } from '~/models/schemas/review.schema'
import { REVIEW_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'

class ReviewService {
  private reviewCollection = databaseService.reviews

  async createReview(userId: string, data: CreateReviewReqBody) {
    try {
      const newReview = new Review({
        ...data,
        userId,
        createdAt: new Date(),
        updatedAt: new Date()
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
      const data = doc.data() as ReviewType
      let updatedAt = handleFormatDate(data.updatedAt as Date)
      let createdAt = handleFormatDate(data.createdAt as Date)
      return { ...doc.data(), id: doc.id, updatedAt, createdAt }
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
      updatedAt: new Date()
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

  async getAllReviews(): Promise<ReviewType[]> {
    try {
      const snapshot = await this.reviewCollection.get()
      const reviews: ReviewType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        reviews.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as ReviewType)
      })
      console.log('All reviews:', reviews)
      return reviews
    } catch (error) {
      console.error('Error getting all reviews:', error)
      throw new Error(`Failed to get all reviews: ${error}`)
    }
  }

  async getReviewByFood(foodId: string): Promise<ReviewType[]> {
    try {
      const querySnapshot = await this.reviewCollection.where('dishId', '==', foodId).get()
      const reviews: ReviewType[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updatedAt = handleFormatDate(data.updatedAt as Date)
        let createdAt = handleFormatDate(data.createdAt as Date)
        reviews.push({ ...doc.data(), id: doc.id, createdAt, updatedAt } as ReviewType)
      })
      console.log('All reviews have food Id:', reviews)
      return reviews
    } catch (error) {
      console.error('Error getting all reviews have food Id:', error)
      throw new Error(`Failed to get all reviews have food Id: ${error}`)
    }
  }
}

const reviewService = new ReviewService()
export default reviewService
