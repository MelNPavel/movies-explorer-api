const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    // eslint-disable-next-line no-useless-escape
    image: Joi.string().required().regex(/((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/),
    // eslint-disable-next-line no-useless-escape
    trailerLink: Joi.string().regex(/((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    // eslint-disable-next-line no-useless-escape
    thumbnail: Joi.string().required().regex(/((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/),
    movieId: Joi.string().hex().length(24),
  }),
}), createMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required(),
  }),
}), deleteMovies);

module.exports = router;
