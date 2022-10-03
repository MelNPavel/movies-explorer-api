const express = require('express');
const mongoose = require('mongoose');

const { PORT = 4000 } = process.env;
const app = express();

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

main();

// require('dotenv').config();
// // const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const { errors, celebrate, Joi } = require('celebrate');
// // const cors = require('cors');

// const auth = require('./midlewares/auth');

// const { login, userCreate } = require('./controllers/users');
// const { usersRouters } = require('./routes/users');
// const { cardsRouters } = require('./routes/cards');
// const NotFoudError = require('./errors/NotFoudError');
// const { requestLogger, errorLogger } = require('./midlewares/logger');

app.use(express.json());

// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(requestLogger);

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

// // app.use(cors(
// //   {
// //     // eslint-disable-next-line quotes, quote-props
// //     "origin": "https://mestofullgha.nomorepartiesxyz.ru/",
// //     // eslint-disable-next-line quote-props, quotes
// //     "credentials": true,
// //     // eslint-disable-next-line quotes, quote-props
// //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
// //     // eslint-disable-next-line quotes, quote-props
// //     "allowedHeaders": "access-control-request-headers",
// //   },
// // ));
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
//     about: Joi.string().min(2).max(30).default('Исследователь'),
//     // eslint-disable-next-line no-useless-escape
//     avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png').regex(/((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), userCreate);

// app.use(auth);

// app.use(usersRouters);

// app.use(cardsRouters);

// app.use(errorLogger);

// app.use('*', (req, res, next) => {
//   next(new NotFoudError('Такой страницы нет'));
// });

// app.use(errors());

// app.use((err, req, res, next) => {
//   const { status = 500, message } = err;
//   res
//     .status(status)
//     .send({
//       message: status === 500
//         ? 'На сервере произошла ошибкаAPPJS'
//         : message,
//     });
//   next();
// });
