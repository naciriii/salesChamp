module.exports = class AddressController {
  constructor(addressService) {
    this.addressService = addressService;
    this.getAddresses = this.getAddresses.bind(this);
    this.postAddress = this.postAddress.bind(this);
  }

  async getAddresses(req, res) {
    try {
      res.json(await this.addressService.getAddresses());
    } catch (err) {
      res.json(err.message);
    }
  }

  async postAddress(req, res) {
    const address = req.body;

    try {
      res.json(await this.addressService.postAddress(address));
    } catch (err) {
      res.json(err.message);
    }
  }
};
