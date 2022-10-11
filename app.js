const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT = 4000 } = process.env;
const app = express();
const router = require('./routes');
const NotFoudError = require('./errors/NotFoudError');
const { requestLogger, errorLogger } = require('./midllewares/logger');

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`);
  } catch (e) {
    console.log('Произошла ошибка на сервере');
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
