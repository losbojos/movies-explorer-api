const express = require('express');
// const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { errorHandler } = require('../errors/errorHandler');
const { NotFoundError } = require('../errors/NotFoundError');
const { createUser, login /* , logout */ } = require('../controllers/users');
const { checkJwtToken } = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');

// подключаем мидлвары, роуты и всё остальное...
const addMiddlewares = (app) => {
  app.use(cors({
    origin: ['https://localhost:3003', 'https://api.lifemovie.nomoreparties.co'],
    credentials: true,
  }));

  app.use(express.json());

  // Логгер запросов нужно подключить до всех обработчиков роутов:
  app.use(requestLogger);

  /// //////////////////////////////////////////////////////////////////
  // Роуты, не требующие авторизации идут перед мидлвэром checkJwtToken

  app.post(
    '/signin',
    celebrate({
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }),
    login,
  );

  // app.delete('/signout', logout); // Разлогиниться

  app.post(
    '/signup',
    celebrate({
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }),
    createUser,
  );

  // подключаем парсер кук как мидлвэр для извлечения токена пользователя
  // app.use(cookieParser());

  // Проверка токена пользователя
  app.use(checkJwtToken);

  /// //////////////////////////////////////////////////////////////////
  // Роуты, требующие авторизации, идут после мидлвэр checkJwtToken

  app.use('/users', usersRouter);
  app.use('/movies', moviesRouter);

  app.use((req, res, next) => {
    next(new NotFoundError('Некорректный роут у запроса'));
  });

  // логгер ошибок нужно подключить после обработчиков роутов и до обработчиков ошибок:
  app.use(errorLogger);

  // обработчики ошибок
  app.use(errors()); // обработчик ошибок celebrate
  app.use(errorHandler); // Централизованный обработчик ошибок
};

module.exports = { addMiddlewares };
