module.exports = class AddressNotFoundError extends Error {
  constructor() {
    super('Address Cannot Be Found');
    this.code = 404;
  }
};
