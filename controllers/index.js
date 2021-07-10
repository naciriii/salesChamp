const AddressController = require('./AddressController');
const { AddressService } = require('../services');
const { Address } = require('../models');

module.exports = {
  AddressController: new AddressController(new AddressService(Address)),
};
