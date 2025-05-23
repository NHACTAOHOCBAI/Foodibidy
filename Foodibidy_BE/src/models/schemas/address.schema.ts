import { AddressTypeName } from '~/constants/enums'

export interface AddressType {
  id?: string
  addressName: string
  userId: string
  typeName: AddressTypeName
}

export default class Address {
  id?: string
  addressName: string
  userId: string
  typeName: AddressTypeName

  constructor(address: AddressType) {
    this.id = address.id || ''
    this.addressName = address.addressName
    this.userId = address.userId
    this.typeName = address.typeName
  }

  toObject(): AddressType {
    return {
      id: this.id,
      addressName: this.addressName,
      userId: this.userId,
      typeName: this.typeName
    }
  }
}
