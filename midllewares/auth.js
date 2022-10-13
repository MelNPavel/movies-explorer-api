const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const DEV_SECRET_JWT = require('../constant/constant');

const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_JWT);
  } catch (e) {
    next(new UnauthorizedError('Отказ в доступе'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
