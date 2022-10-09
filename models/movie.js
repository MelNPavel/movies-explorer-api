const mongoose = require('mongoose');
// const validator = require('validator');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      // eslint-disable-next-line func-names, object-shorthand
      validator: function (v) {
        // eslint-disable-next-line no-useless-escape
        return /((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/.test(v);
      // eslint-disable-next-line indent
     },
      message: 'Ошибка в ссылке',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      // eslint-disable-next-line func-names, object-shorthand
      validator: function (v) {
        // eslint-disable-next-line no-useless-escape
        return /(?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?/.test(v);
      // eslint-disable-next-line indent
     },
      message: 'Ошибка в ссылке',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      // eslint-disable-next-line func-names, object-shorthand
      validator: function (v) {
        // eslint-disable-next-line no-useless-escape
        return /(?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?/.test(v);
      // eslint-disable-next-line indent
     },
      message: 'Ошибка в ссылке',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
