const express = require('express');

const router = express.Router();
const { AddressController } = require('../controllers');

router.get('/', AddressController.getAddresses);
router.get('/:id', AddressController.getAddress);
router.patch('/:id', AddressController.updateAddress);

router.delete('/:id', AddressController.deleteAddress);
router.post('/', AddressController.postAddress);
module.exports = router;
