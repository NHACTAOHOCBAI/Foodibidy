import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'

class AddressService {
  private addressCollection = databaseService.addresses

  async createAddress(data: CreateAddressReqBody) {
    const docRef = await this.addressCollection.add({ ...data, created_at: new Date() })
    return docRef.id
  }

  async getAddress(id: string) {
    const doc = await this.addressCollection.doc(id).get()
    if (!doc.exists) throw new ErrorWithStatus({ message: 'Address not found', status: HTTP_STATUS.NOT_FOUND })
    return doc.data()
  }

  async getAllAddresses() {
    const snapshot = await this.addressCollection.get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async updateAddress(id: string, data: UpdateAddressReqBody) {
    await this.addressCollection.doc(id).update({ ...data, updated_at: new Date() })
  }

  async deleteAddress(id: string) {
    await this.addressCollection.doc(id).delete()
  }
}

export const addressService = new AddressService()
