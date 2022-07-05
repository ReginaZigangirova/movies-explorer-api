require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { ENV_PORT, DB_URL } = require('./utils/config');
const rateLimiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(DB_URL);

app.use(cors());
app.use(requestLogger);
app.use(rateLimiter);
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(ENV_PORT, () => {
  console.log('server');
});
