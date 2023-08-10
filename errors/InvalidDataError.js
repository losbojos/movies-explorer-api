const { INVALID_DATA_ERROR_CODE, INVALID_DATA_ERROR_NAME, INVALID_DATA_ERROR_MSG } = require('./consts');

module.exports = class InvalidDataError extends Error {
  constructor(message = INVALID_DATA_ERROR_MSG) {
    super(message);
    this.name = INVALID_DATA_ERROR_NAME;
    this.statusCode = INVALID_DATA_ERROR_CODE;
  }
};
