const express = require('express');
const { celebrate, Joi } = require('celebrate');

const moviesRouters = express.Router();
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

moviesRouters.get('/movies', getMovies);

moviesRouters.post('/movies', celebrate({
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
    movieId: Joi.number().required(),
  }),
}), createMovies);

moviesRouters.delete('/movies/_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovies);

module.exports = { moviesRouters };
