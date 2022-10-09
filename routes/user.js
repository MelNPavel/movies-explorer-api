const express = require('express');

const { celebrate, Joi } = require('celebrate');

const usersRouters = express.Router();
const {
  userUpdate,
  getUserMe,
} = require('../controllers/users');

usersRouters.get('/users/me', getUserMe);

usersRouters.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
}), userUpdate);

usersRouters.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Exit' });
});

module.exports = { usersRouters };
