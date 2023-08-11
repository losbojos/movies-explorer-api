const { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MSG } = require('./consts');

module.exports = function errorHandler(err, req, res, next) {
  let statusCode;
  let message;

  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    statusCode = DEFAULT_ERROR_CODE;
    message = `${DEFAULT_ERROR_MSG}: ${err.message}`;
  }

  res
    .status(statusCode)
    .send({
      message,
    });

  next();
};
