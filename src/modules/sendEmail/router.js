const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', controller.sendEmail);

module.exports = router;
