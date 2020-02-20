const nodemailer = require('nodemailer');
const configTransporter = require('./config');
const config = require('../../config');

const companyName = config.get('transporter.name');
const transporter = nodemailer.createTransport(configTransporter);

module.exports = {
  sendEmail: async (obj) => {
    const { to, subject, body, attachments } = obj;

    const mailOptions = {
      from: `${companyName} <${configTransporter.auth.email}>`,
      to,
      subject,
      html: body,
    };

    const mailOptionsWithAttachment = {
      ...mailOptions,
      attachments,
    };

    try {
      let parsedMailOptions = mailOptions;
      if (attachments !== null) {
        parsedMailOptions = mailOptionsWithAttachment;
      }
      await transporter.sendMail(parsedMailOptions);
      return true;
    } catch (err) {
      return err;
    }
  },
};
