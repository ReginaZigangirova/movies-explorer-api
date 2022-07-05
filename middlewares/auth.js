const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(errorMessages.authorizationErrorMessageJWT));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    next(new AuthError(errorMessages.authorizationErrorMessageJWT));
    return;
  }

  req.user = payload;

  next();
};
