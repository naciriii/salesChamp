const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
  country: {
    type: String, required: true, minLength: 2, maxLength: 2,match: /^[a-zA-Z]+$/    , uppercase: true,
  },
  city: { type: String, required: true },
  street: { type: String, required: true },
  postalcode: {
    type: String, required: true, minLength: 5, maxLength: 5,
  },
  number: {type :Number, required: true, min:0},
  numberAudition: { type: String, required: false },
  status: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },

}, { timestamps: true});
addressSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: (path, value) => delete value._id && value,
  });

module.exports = mongoose.model('Address', addressSchema);
