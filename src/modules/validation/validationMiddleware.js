const enums = require('./enums');
const { ValidationError } = require('../errors');

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    let value;
    switch (property) {
      case enums.VALIDATION_FIELDS.QUERY:
        value = req.query;
        break;
      case enums.VALIDATION_FIELDS.BODY:
        value = req.body;
        break;
      case enums.VALIDATION_FIELDS.PARAMS:
        value = req.params;
        break;
      default:
        throw new Error('');
    }

    const errorvalidationResponse = schema.validate(value);

    const { error } = errorvalidationResponse;

    const valid = error == null;

    if (valid) {
      next();
    } else {
      const validationError = new ValidationError(error);
      next(validationError);
    }
  };
};
module.exports = validationMiddleware;
