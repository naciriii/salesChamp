module.exports = class UpdateAddressForbiddenErrorError extends Error {
  constructor() {
    super('Update Address Forbidden');
    this.code = 403;
  }
};
