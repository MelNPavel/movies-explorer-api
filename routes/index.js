const express = require('express');

const router = express.Router();

const auth = require('../midllewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { login, userCreate } = require('../controllers/users');
const { signValidate, signupValidate } = require('../midllewares/validation');
const NotFoudError = require('../errors/NotFoudError');

router.post('/signin', signValidate, login);

router.post('/signup', signupValidate, userCreate);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Exit' });
});

router.use((req, res, next) => {
  next(new NotFoudError('Такой страницы нет'));
});

module.exports = router;
