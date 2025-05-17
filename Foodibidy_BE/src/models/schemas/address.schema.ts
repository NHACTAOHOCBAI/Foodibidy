export interface AddressType {
  id?: string
  address_name: string
  account_id: string
  created_at?: Date | string
  updated_at?: Date | string
}

export default class Address {
  id?: string
  address_name: string
  account_id: string
  created_at?: Date | string
  updated_at?: Date | string

  constructor(address: AddressType) {
    this.id = address.id
    this.address_name = address.address_name
    this.account_id = address.account_id
  }

  toObject(): AddressType {
    const createdAt = this.created_at ? this.created_at : Date.now()
    const updatedAt = this.updated_at ? this.updated_at : Date.now()
    return {
      id: this.id,
      address_name: this.address_name,
      account_id: this.account_id,
      created_at: createdAt as Date,
      updated_at: updatedAt as Date
    }
  }
}
