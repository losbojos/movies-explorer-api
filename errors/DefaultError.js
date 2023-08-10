const { DEFAULT_ERROR_CODE, DEFAULT_ERROR_NAME, DEFAULT_ERROR_MSG } = require('./consts');

module.exports = class DefaultError extends Error {
  constructor(statusCode = DEFAULT_ERROR_CODE, message = DEFAULT_ERROR_MSG) {
    super(message);
    this.name = DEFAULT_ERROR_NAME;
    this.statusCode = statusCode;
  }
};
