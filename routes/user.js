const express = require('express');

const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  userUpdate,
  getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
}), userUpdate);

module.exports = router;
