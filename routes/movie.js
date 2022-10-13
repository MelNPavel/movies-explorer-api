const express = require('express');

const { createMovieValidate, deleteMovieValidate } = require('../midllewares/validation');

const router = express.Router();
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', createMovieValidate, createMovies);

router.delete('/:_id', deleteMovieValidate, deleteMovies);

module.exports = router;
