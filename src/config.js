const dotenv = require('dotenv');
const convict = require('convict');
const fs = require('fs');

dotenv.config();

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind the app.',
    format: 'port',
    default: 3000,
    env: 'NODEMAILER_PORT',
  },
  transporter: {
    provider: {
      host: {
        doc: 'smtp',
        format: String,
        default: '',
        env: 'NODEMAILER_TRANSPORTER_SMTP',
      },
      port: {
        doc: 'port',
        format: String,
        default: '',
        env: 'NODEMAILER_TRANSPORTER_PORT',
      },
      secure: {
        doc: 'SSL/TLS',
        format: Boolean,
        default: false,
        env: 'NODEMAILER_TRANSPORTER_SECURE',
      },
    },
    auth: {
      user: {
        doc: 'user email',
        format: String,
        default: '',
        env: 'NODEMAILER_TRANSPORTER_EMAIL',
      },
      password: {
        doc: 'user password',
        format: String,
        default: '',
        env: 'NODEMAILER_TRANSPORTER_PASSWORD',
      },
    },
    name: {
      doc: 'company name',
      format: String,
      default: '',
      env: 'NODEMAILER_TRANSPORTER_COMPANY_NAME',
    },
  },
});

// Enable config override using scoped config files
const env = config.get('env');
const file = `./config.${env}.json`;
if (fs.existsSync(file)) {
  config.loadFile(file);
}

config.validate({ allowed: 'strict' });

module.exports = config;
