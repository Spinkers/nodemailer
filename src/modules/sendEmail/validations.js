const Joi = require('@hapi/joi');
const { errorMessages } = require('../validation/i18n');

module.exports = {
  emailBody: Joi.object().keys({
    to: Joi.string()
    .required()
    .messages({
        'any.required': errorMessages.MESSAGES.ANY_REQURIED,
      }),
    subject: Joi.string()
      .max(255)
      .required()
      .messages({
        'string.max': errorMessages.MESSAGES.STRING_MAX,
        'any.required': errorMessages.MESSAGES.ANY_REQURIED,
      }),
    body: Joi.string()
      .required()
      .messages({
        'any.required': errorMessages.MESSAGES.ANY_REQURIED,
      }),
    attachments: Joi.array()
    .items(
      Joi.object({
        path: Joi.string()
      })
    )
  }),
};
