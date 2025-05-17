import { ErrorWithStatus } from '~/models/errors'
import databaseService from './database.service'
import { CreateAddressReqBody, UpdateAddressReqBody } from '~/models/requests/address.request'
import Address, { AddressType } from '~/models/schemas/address.schema'
import { ADDRESS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleFormatDate } from '~/utils/utils'

class AddressService {
  private addressCollection = databaseService.addresses

  async createAddress(data: CreateAddressReqBody) {
    try {
      const newAddress = new Address({
        ...data
      }).toObject()

      const docRef = await this.addressCollection.add(newAddress)
      console.log('Address created with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creating address:', error)
      throw new Error(`Failed to create address: ${error}`)
    }
  }

  async getAddress(id: string) {
    const doc = await this.addressCollection.doc(id).get()
    if (doc.exists) {
      const data = doc.data() as AddressType
      let updated_at = handleFormatDate(data.updated_at as Date)
      let created_at = handleFormatDate(data.created_at as Date)
      console.log(`Get address success with ID ${doc.id}`)
      return { ...doc.data(), id: doc.id, created_at, updated_at }
    }
    throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
  }

  async updateAddress(id: string, data: UpdateAddressReqBody) {
    const doc = await this.addressCollection.doc(id).get()

    if (!doc.exists) {
      throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }

    const updatedAddress = {
      ...data,
      updated_at: new Date()
    }

    try {
      await this.addressCollection.doc(id).update(updatedAddress)
      console.log(`Update address success with ID ${doc.id}`)
    } catch (error) {
      console.error('Error updating address:', error)
      throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async deleteAddress(id: string) {
    try {
      await this.addressCollection.doc(id).delete()
      console.log(`Address with ID ${id} deleted successfully`)
    } catch (error) {
      console.error(`Error deleting address with ID ${id}:`, error)
      throw new ErrorWithStatus({ message: ADDRESS_MESSAGES.ADDRESS_NOT_FOUND, status: HTTP_STATUS.NOT_FOUND })
    }
  }

  async getAllAddresses(): Promise<AddressType[]> {
    try {
      const snapshot = await this.addressCollection.get()
      const addresses: AddressType[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log(doc.id)
        let updated_at = handleFormatDate(data.updated_at as Date)
        let created_at = handleFormatDate(data.created_at as Date)
        addresses.push({ id: doc.id, ...doc.data(), created_at, updated_at } as AddressType)
      })
      console.log('All addresses:', addresses)
      return addresses
    } catch (error) {
      console.error('Error getting all addresses:', error)
      throw new Error(`Failed to get all addresses: ${error}`)
    }
  }
}

const addressService = new AddressService()
export default addressService
