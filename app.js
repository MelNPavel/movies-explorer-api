require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const helmet = require('helmet');

const { PORT = 4000, NODE_ENV, DB_LINK } = process.env;

const DB_LINKDEV = require('./constant/constant');

const app = express();
const router = require('./routes');
const { requestLogger, errorLogger } = require('./midllewares/logger');
const handleServerError = require('./midllewares/handleServerError');

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

app.use(helmet());

app.use(router);

app.use(errors());

app.use(handleServerError);

app.use(errorLogger);

main();
