const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const InvalidDataError = require('../errors/InvalidDataError');
const AuthError = require('../errors/AuthError');

const {
  STATUS_OK,
  STATUS_CREATED,
  VALIDATION_ERROR_NAME,
  CAST_ERROR_NAME,
  NOT_FOUND_USER_ERROR,
  AUTH_WRONG_DATA,
  EMAIL_ALREADY_EXISTS,
  NO_PARAMS_FOR_CHANGE,
} = require('../errors/consts');

const { getJwtToken } = require('../middlewares/auth');

const SALT_ROUNDS = 10;
// const JWT_COOKIE = 'jwt';

// регистронезависимый поиск email
const findUserByEmail = (email) => {
  const regex = new RegExp(`${email}`, 'i');
  return User.findOne({ email: { $regex: regex } });
};

const createAuthResult = (user) => {
  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: getJwtToken(user._id),
  };
  return data;
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
                res.status(STATUS_CREATED).send(createAuthResult(user));
              })
              .catch((err) => {
                if (err.code === 11000) {
                  next(new ConflictError(EMAIL_ALREADY_EXISTS));
                } else if (err.name === VALIDATION_ERROR_NAME) {
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
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError())
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR_NAME) {
        next(new InvalidDataError(err.message));
      } else {
        next(err);
      }
    });
};

const patchMe = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  if (!name && !email) {
    next(new InvalidDataError(NO_PARAMS_FOR_CHANGE));
  } else {
    User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
      .orFail(new NotFoundError(NOT_FOUND_USER_ERROR))
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        if (err.name === VALIDATION_ERROR_NAME) {
          next(new InvalidDataError(err.message));
        } else if (err.code === 11000) {
          next(new ConflictError(EMAIL_ALREADY_EXISTS));
        } else {
          next(err);
        }
      });
  }
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
              res.status(STATUS_OK).send(createAuthResult(user));

              /*
              // .cookie(JWT_COOKIE, token, {
                //   maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
                //   httpOnly: true,
                //   secure: true,
                //   sameSite: 'none', // 'strict'
                // })
              */
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
