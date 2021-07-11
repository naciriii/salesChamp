const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
  country: {
    type: String, required: true, minLength: 2, maxLength: 2, uppercase: true,
  },
  city: { type: String, required: true },
  street: { type: String, required: true },
  postalcode: {
    type: String, required: true, minLength: 5, maxLength: 5,
  },
  number: Number,
  numberAudition: { type: String, required: false },
  status: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },

}, { timestamps: true });
module.exports = mongoose.model('Address', addressSchema);
