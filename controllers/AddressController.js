const mongoose = require('mongoose');
const { AddressNotFoundError, UpdateAddressForbiddenError } = require('../services/errors');

module.exports = class AddressController {
  constructor(addressService) {
    this.addressService = addressService;
    this.getAddresses = this.getAddresses.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.postAddress = this.postAddress.bind(this);

    this.deleteAddress = this.deleteAddress.bind(this);
  }

  async getAddresses(req, res) {
    try {
      res.json(await this.addressService.getAddresses());
    } catch (err) {
      res.json(err.message);
    }
  }

  async getAddress(req, res) {
    try {
      const address = await this.addressService.getAddress(req.params.id);
      if (!address) {
        throw new AddressNotFoundError();
      }
      res.json(address);
    } catch (err) {
      let errorMessage = err.message;
      let statusCode;
      if (err instanceof AddressNotFoundError) {
        statusCode = err.code;
      } else if (err instanceof mongoose.Error.CastError) {
        errorMessage = 'Passed Address Identifier is incorrect';
        statusCode = 409;
      }

      res.status(statusCode).json(errorMessage);
    }
  }

  async updateAddress(req, res) {
    try {
      const address = await this.addressService.updateAddress(req.params.id, req.body);
      res.json(address);
    } catch (err) {
      let errorMessage = err.message;
      let statusCode;

      if (err instanceof AddressNotFoundError) {
        statusCode = err.code;
      } else if (err instanceof UpdateAddressForbiddenError) {
        statusCode = err.code;
      } else if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 422;
      } else if (err instanceof mongoose.Error.CastError) {
        errorMessage = 'Passed Address Identifier is incorrect';
        statusCode = 409;
      }

      res.status(statusCode).json(errorMessage);
    }
  }

  async deleteAddress(req, res) {
    try {
      await this.addressService.deleteAddress(req.params.id);

      res.status(204).send();
    } catch (err) {
      let errorMessage = err.message;
      let statusCode = 404;
      if (err instanceof mongoose.Error.CastError) {
        errorMessage = 'Passed Address Identifier is incorrect';
        statusCode = 409;
      }

      res.status(statusCode).json(errorMessage);
    }
  }

  async postAddress(req, res) {
    const address = req.body;

    try {
      return res.status(201).json(await this.addressService.postAddress(address));
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.message);
      }
      return res.json(err.message);
    }
  }
};
