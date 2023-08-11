const { FORBIDDEN_ERROR_CODE, FORBIDDEN_ERROR_NAME, FORBIDDEN_ERROR_MSG } = require('./consts');

module.exports = class ForbiddenError extends Error {
  constructor(message = FORBIDDEN_ERROR_MSG) {
    super(message);
    this.name = FORBIDDEN_ERROR_NAME;
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
};
