const mongoose = require('mongoose')
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
      res.status(201).json(await this.addressService.postAddress(address));
    } catch (err) {
        if(err instanceof mongoose.Error.ValidationError) {
            return res.status(422).json(err.message)
        }
      return res.json(err.message);
    }
  }
};
