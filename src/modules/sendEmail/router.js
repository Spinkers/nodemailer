const express = require('express');
const controller = require('./controller');
const { validationMiddleware } = require('../validation');
const schemas = require('./validations');

const router = express.Router();

router.get('/', validationMiddleware(schemas.emailBody, 'body'), controller.sendEmail);

module.exports = router;
