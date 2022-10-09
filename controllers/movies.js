const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const NotFoudError = require('../errors/NotFoudError');
const InternalServerError = require('../errors/InternalServerError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.status(200).send(movies);
  } catch (e) {
    return next(new InternalServerError('Ошибка в запросе'));
  }
};

const createMovies = async (req, res, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  try {
    const movies = await new Movie({
      // eslint-disable-next-line max-len
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner,
    }).save();
    if (!movies) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    return res.status(200).send(movies);
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

const deleteMovies = async (req, res, next) => {
  const userId = req.user._id;
  const { _id } = req.params;
  try {
    const movie = await Movie.findById(_id);
    if (!movie) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    if (userId !== movie.owner.toString()) {
      return next(new ForbiddenError('Карточка не принадлежит данному пользователю'));
    }
    const movies = await Movie.findByIdAndDelete(_id);
    if (!movies) {
      return next(new NotFoudError('Такой картоки нет'));
    }
    return res.status(200).send(movies);
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequest('Ошибка в запросе'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
