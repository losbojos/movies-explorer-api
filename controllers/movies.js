const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { InvalidDataError } = require('../errors/InvalidDataError');
const { STATUS_CREATED } = require('../errors/statusCodes');

const createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    owner: userId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(err.message));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id; // авторизованный пользователь

  Movie.findById(movieId)
    .orFail(new NotFoundError())
    .then((movie) => {
      if (!movie.owner.equals(userId)) next(new ForbiddenError('Запрещено удалять фильмы другого пользователя.'));
      else {
        Movie.findByIdAndDelete(movieId).then((deletedMovie) => {
          res.send(deletedMovie);
        })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError(`Ошибка конвертации: ${err.message}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
