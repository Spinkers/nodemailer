const nodemailer = require('nodemailer');
const config = require('./config');
const template = require('./template');

module.exports = {
  sendEmail: async () => {
    const transporter = nodemailer.createTransport(config);
    try {
     await transporter.sendMail({
        from: 'Conex Code <conexcode@gmail.com>',
        to: 'lucasmouraolopes@gmail.com',
        subject: 'Email de teste',
        html: template.body,
        attachments: [
          {   
            path: '/home/lucas/Downloads/nodeMailer/attachments/test.txt'
          },
        ],
      })
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};
