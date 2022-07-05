const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/AuthError');
const { errorMessages } = require('../utils/constants');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: errorMessages.badRequestErrorMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
UserSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(errorMessages.authorizationErrorMessageLogin));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(errorMessages.authorizationErrorMessageLogin));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', UserSchema);
