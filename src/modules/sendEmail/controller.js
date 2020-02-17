const service = require('./service');

module.exports = {
  sendEmail: async (req, res) => {
    try {
      const response = await service.sendEmail();
      if(response === true){
        res.json({ message: 'Email enviado com sucesso!' });
      }else{
        res.status(400).json({ message: 'Houve um erro ao enviar o email!' });
      }
    } catch (err) {
      next(err);
    }
  }
};
