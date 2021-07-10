module.exports = class AddressService {
  constructor(address) {
    this.address = address;
  }

  getAddresses() {
    return this.address.find().exec();
  }

  postAddress(address) {
    return this.address.create(address);
  }
};
