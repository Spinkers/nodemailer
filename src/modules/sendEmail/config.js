const config = require('../../config');

module.exports = {
    host: config.get('transporter.provider.host'),
    port: config.get('transporter.provider.port'),
    secure: config.get('transporter.provider.secure'),
    auth: {
      user: config.get('transporter.auth.user'),
      pass: config.get('transporter.auth.password')
    },  
};