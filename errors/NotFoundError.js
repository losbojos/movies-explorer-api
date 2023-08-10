const { NOT_FOUND_ERROR_CODE, NOT_FOUND_ERROR_NAME, NOT_FOUND_ERROR_MSG } = require('./consts');

module.exports = class NotFoundError extends Error {
  constructor(message = NOT_FOUND_ERROR_MSG) {
    super(message);
    this.name = NOT_FOUND_ERROR_NAME;
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
};
