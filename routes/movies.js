const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../validation/patterns');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const checkObjectId = Joi.string().required().hex().length(24);

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(urlPattern),
      trailerLink: Joi.string().required().regex(urlPattern),
      thumbnail: Joi.string().required().regex(urlPattern),
      // owner: checkObjectId,
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: checkObjectId,
    }),
  }),
  deleteMovie,
);

module.exports = router;
