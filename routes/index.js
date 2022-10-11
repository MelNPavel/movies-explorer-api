const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const auth = require('../midllewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { login, userCreate } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), userCreate);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Exit' });
});

module.exports = router;
