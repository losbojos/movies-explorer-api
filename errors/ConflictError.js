const { CONFLICT_ERROR_CODE, CONFLICT_ERROR_NAME, CONFLICT_ERROR_MSG } = require('./consts');

module.exports = class ConflictError extends Error {
  constructor(message = CONFLICT_ERROR_MSG) {
    super(message);
    this.name = CONFLICT_ERROR_NAME;
    this.statusCode = CONFLICT_ERROR_CODE;
  }
};
