const express = require('express');

const router = express.Router();
const { AddressController } = require('../controllers');

router.get('/', AddressController.getAddresses);
router.post('/', AddressController.postAddress);
module.exports = router;
