const http = require('http');
const express = require('express');

const enums = require('../src/modules/enums');
const errors = require('../src/modules/errors');

const sendEmail = require('../src/modules/sendEmail');

const app = express();
const port = 3000;
app.set('port', port);

app.use(express.json());

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        version: '0.0.1',
    });
});

app.use('/', route);
app.use('/sendEmail', sendEmail.API);

server.listen(port);

app.use((err, req, res, next) => {
    const formatedErrors = errors.handleError(err);
  
    const statusCode = err.statusCode ? err.statusCode : enums.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const isOperational = errors.isOperationalError(err);
  
    if (formatedErrors != null) {
      res.status(statusCode).json(formatedErrors);
    } else {
      res.sendStatus(statusCode);
    }
  
    if (!isOperational) {
      // If the error is not operational, emit a shutdown event so the server has a chance to start
      // the shutdown process, allowing current requests to finish before exiting.
      app.emit('shutdown');
    }
  });

console.log('API is running on port ', port);
