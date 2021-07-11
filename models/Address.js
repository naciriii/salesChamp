const mongoose = require('mongoose');

const allowedStatus = ['not at home', 'not interested', 'interested'];

const { Schema } = mongoose;

const addressSchema = new Schema({
  country: {
    type: String, required: true, minLength: 2, maxLength: 2, match: /^[a-zA-Z]+$/, uppercase: true,
  },
  city: { type: String, required: true },
  street: { type: String, required: true },
  postalcode: {
    type: String, required: true, minLength: 5, maxLength: 5,
  },
  number: { type: Number, required: true, min: 0 },
  numberAddition: { type: String, required: false },
  status: {
    type: String,
    default: null,
    validate: [(value) => !value || allowedStatus.includes(value), `status field must be one of those values: ${allowedStatus.join(',')}`],
  },
  name: { type: String, default: null },

  email: {
    type: String,
    default: null,
    validate: [(value) => {
      /* eslint-disable-next-line no-useless-escape */
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return !value || emailRegex.test(value);
    }, 'Please use a valid email address'],
  },

}, { timestamps: true });
addressSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  /* eslint-disable-next-line no-underscore-dangle, no-param-reassign */
  transform: (path, value) => delete value._id && value,
});

module.exports = mongoose.model('Address', addressSchema);
