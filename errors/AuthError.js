const { AUTH_ERROR_CODE, AUTH_ERROR_NAME, AUTH_ERROR_MSG } = require('./consts');

module.exports = class AuthError extends Error {
  constructor(message = AUTH_ERROR_MSG) {
    super(message);
    this.name = AUTH_ERROR_NAME;
    this.statusCode = AUTH_ERROR_CODE;
  }
};
