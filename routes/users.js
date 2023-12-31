const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMe, patchMe,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  }),
  patchMe,
);

module.exports = router;
