const mongoose = require('mongoose');
const { urlPattern } = require('../validation/patterns');

const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
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
    validate: urlPattern,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: urlPattern,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: urlPattern,
  },
  owner: {
    type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('movie', cardSchema);
