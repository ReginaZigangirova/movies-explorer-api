const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const InvalidRequest = require('../errors/InvalidRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const { errorMessages } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// логин
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new InvalidRequest(errorMessages.validationErrorMessage));
    });
};

// создаёт пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.status(200)
      .send({
        data: {
          name,
          email,
        },
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidRequest(errorMessages.validationErrorMessage));
        return;
      }
      if (err.code === 11000) {
        next(new Conflict(errorMessages.emailConflictErrorMessage));
        return;
      }
      next(err);
    })
    .catch(next);
};

// возвращает информацию о текущем пользователе
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// обновляет профиль
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFound(errorMessages.notFoundUserErrorMessage))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidRequest(errorMessages.validationErrorMessage));
      } else if (err.code === 11000) {
        next(new Conflict(errorMessages.emailConflictErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateUser,
  login,
  createUser,
};
