const BaseError = require('./BaseError');
const enums = require('../enums');

class ValidationError extends BaseError {
  constructor(joiError) {
    super(joiError.message);

    this.name = 'ValidationError';
    this.statusCode = enums.HTTP_STATUS.BAD_REQUEST;
    this.isOperational = true;

    this.details = joiError.details.map((detail) => {
      return {
        message: detail.message,
        key: detail.context.key || detail.context.missingWithLabels[0],
        type: detail.type,
      };
    });
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidationError;
