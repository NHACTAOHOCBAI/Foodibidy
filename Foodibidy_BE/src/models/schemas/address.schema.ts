export interface AddressType {
  id: string
  addressName: string
  accountId: string
}

export default class Address {
  id: string
  addressName: string
  accountId: string

  constructor(address: AddressType) {
    this.id = address.id
    this.addressName = address.addressName
    this.accountId = address.accountId
  }

  toObject(): AddressType {
    return {
      id: this.id,
      addressName: this.addressName,
      accountId: this.accountId
    }
  }
}
