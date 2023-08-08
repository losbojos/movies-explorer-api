const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { InvalidDataError } = require('../errors/InvalidDataError');
const { AuthError } = require('../errors/AuthError');
const { STATUS_CREATED } = require('../errors/statusCodes');
const { getJwtToken } = require('../middlewares/auth');

const SALT_ROUNDS = 10;
// const JWT_COOKIE = 'jwt';

const NOT_FOUND_USER_ERROR = 'Пользователь с указанным идентификатором не найден.';
const AUTH_WRONG_DATA = 'Неверные имя пользователя или пароль.';
const EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже зарегистрирован';

// регистронезависимый поиск email
const findUserByEmail = (email) => {
  const regex = new RegExp(`${email}`, 'i');
  return User.findOne({ email: { $regex: regex } });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  findUserByEmail(email)
    .then((data) => {
      if (!data) {
        bcrypt.hash(password, SALT_ROUNDS)
          .then((hash) => {
            User.create({
              name, email, password: hash,
            })
              .then((user) => {
                res.status(STATUS_CREATED).send({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                });
              })
              .catch((err) => {
                if (err.code === 11000) {
                  next(new ConflictError(EMAIL_ALREADY_EXISTS));
                } else if (err.name === 'ValidationError') {
                  next(new InvalidDataError(err.message));
                } else {
                  next(err);
                }
              });
          })
          .catch(next);
      } else {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError())
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InvalidDataError(`Ошибка конвертации: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const patchMe = (req, res, next) => {
  const { name, email, _id } = req.body;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(NOT_FOUND_USER_ERROR))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(err.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  findUserByEmail(email).select('+password')
    .then((user) => {
      if (!user) {
        next(new AuthError(AUTH_WRONG_DATA));
      } else {
        bcrypt.compare(password, user.password)
          .then((success) => {
            if (!success) {
              next(new AuthError(AUTH_WRONG_DATA));
            } else {
              const token = getJwtToken(user._id);

              res
                // .cookie(JWT_COOKIE, token, {
                //   maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
                //   httpOnly: true,
                //   secure: true,
                //   sameSite: 'none', // 'strict'
                // })
                .status(200).send({
                  token,
                  user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                  },
                });
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

// const logout = (req, res) => {
//   res.clearCookie(JWT_COOKIE).send({ message: 'Выход' });
// };

module.exports = {
  createUser,
  login,
  // logout,
  getMe,
  patchMe,
};
