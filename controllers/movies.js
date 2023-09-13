const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const InvalidDataError = require('../errors/InvalidDataError');
const {
  STATUS_CREATED,
  VALIDATION_ERROR_NAME,
  CAST_ERROR_NAME,
  FORBIDDEN_DELETE_NON_OWN_MOVIES,
} = require('../errors/consts');

const createMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.create({
    ...req.body,
    owner: userId,
  })
    .then((movie) => {
      res.status(STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR_NAME) {
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
  const { id } = req.params; // Параметр вызова id объекта фильма в данной БД (_id, а не movieId)
  const userId = req.user._id; // авторизованный пользователь

  Movie.findById(id)
    .orFail(new NotFoundError())
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        next(new ForbiddenError(FORBIDDEN_DELETE_NON_OWN_MOVIES));
      } else {
        Movie.findByIdAndDelete(id).then((deletedMovie) => {
          res.send(deletedMovie);
        })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR_NAME) {
        next(new InvalidDataError(err.message));
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
