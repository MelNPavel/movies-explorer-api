const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');

const { PORT = 4000 } = process.env;
const app = express();
const auth = require('./midllewares/auth');
const { usersRouters } = require('./routes/user');
const { moviesRouters } = require('./routes/movie');
const NotFoudError = require('./errors/NotFoudError');
const { requestLogger, errorLogger } = require('./midllewares/logger');

const { login, userCreate } = require('./controllers/users');

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
    // eslint-disable-next-line no-console
    console.log(`Сервер запущен на ${PORT} порту`);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Произошла ошибка на сервере');
  }
}

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userCreate);

app.use(auth);

app.use(usersRouters);

app.use(moviesRouters);

app.use(errorLogger);

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

main();

// require('dotenv').config();
// // const bodyParser = require('body-parser');

// // const cors = require('cors');

// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// const allowedCors = [
//   // eslint-disable-next-line quotes
//   "https://mestofullgha.nomorepartiesxyz.ru",
//   // eslint-disable-next-line quotes
//   "http://mestofullgha.nomorepartiesxyz.ru",
//   // eslint-disable-next-line quotes
//   "http://localhost:3000",
// ];

// app.use((req, res, next) => {
//   const { method } = req;
//   const { origin } = req.headers;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   return next();
// });