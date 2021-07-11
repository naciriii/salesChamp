const { AddressNotFoundError, UpdateAddressForbiddenError } = require('./errors');

module.exports = class AddressService {
  constructor(address) {
    this.address = address;
  }

  getAddresses() {
    return this.address.find().exec();
  }

  getAddress(id) {
    return this.address.findById(id).exec();
  }

  async updateAddress(id, addressPayload) {
    if (!addressPayload.status) {
      throw new UpdateAddressForbiddenError();
    }
    const address = await this.getAddress(id);
    if (!address) {
      throw new AddressNotFoundError();
    }
    if (address.status === null || address.status === 'not at home') {
      address.status = addressPayload.status;
      address.name = addressPayload.name;
      address.email = addressPayload.email;
      return address.save();
    }
    throw new UpdateAddressForbiddenError();
  }

  async deleteAddress(id) {
    const address = await this.getAddress(id);
    if (!address) {
      throw new AddressNotFoundError();
    }
    return this.address.deleteOne({ _id: id }).exec();
  }

  postAddress({
    country, city, street, postalcode, number, numberAddition,
  }) {
    return this.address.create({
      country, city, street, postalcode, number, numberAddition,
    });
  }
};
