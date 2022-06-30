require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const rateLimiter = require('./middlewares/rateLimit');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movie'));

app.use('*', auth, (req, res, next) => {
  next(new NotFound('Страница с таким url не найдена.'));
});
app.use(errorLogger);
app.use((err, _, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'Ошибка по умолчанию.' });
  next();
});
app.listen(PORT, () => {
  console.log('server');
});
