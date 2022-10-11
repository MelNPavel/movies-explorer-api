require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT = 4000, NODE_ENV, DB_LINK } = process.env;

const DB_LINKDEV = require('./constant/constant');

const app = express();
const router = require('./routes');
const NotFoudError = require('./errors/NotFoudError');
const { requestLogger, errorLogger } = require('./midllewares/logger');

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

async function main(next) {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? DB_LINK : DB_LINKDEV, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
  } catch (e) {
    next(e);
  }
}

app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFoudError('Такой страницы нет'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res
    .status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибкаAPPJS'
        : message,
    });
  next();
});

app.use(errorLogger);

main();
