class ReviewService {
  private reviewCollection = databaseService.reviews

  async createReview(data: CreateReviewReqBody) {
    const docRef = await this.reviewCollection.add({ ...data, created_at: new Date() })
    return docRef.id
  }

  async getReview(id: string) {
    const doc = await this.reviewCollection.doc(id).get()
    if (!doc.exists) throw new ErrorWithStatus({ message: 'Review not found', status: HTTP_STATUS.NOT_FOUND })
    return doc.data()
  }

  async getAllReviews() {
    const snapshot = await this.reviewCollection.get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async updateReview(id: string, data: UpdateReviewReqBody) {
    await this.reviewCollection.doc(id).update(data)
  }

  async deleteReview(id: string) {
    await this.reviewCollection.doc(id).delete()
  }
}

export const reviewService = new ReviewService()
