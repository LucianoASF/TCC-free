const express = require('express');
const removeId = require('./src/middlewares/removeId.js');
const cors = require('cors');
const { scopePerRequest } = require('awilix-express');
const container = require('./container');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(scopePerRequest(container));
app.use(
  express.json(),
  removeId,
  container.resolve('usuariosRoute'),
  container.resolve('timesRoute'),
  container.resolve('autenticacaoRoute'),
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('servidor escutando!');
});
