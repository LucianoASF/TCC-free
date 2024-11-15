// timesRoute.js
const { Router } = require('express');
const { makeInvoker } = require('awilix-express');

module.exports = () => {
  const router = Router();

  // Criamos uma função que invoca o `timeController` do container
  const invokeTimeController = makeInvoker(
    (container) => container.timeController,
  );

  // Definindo as rotas para `timeController`
  router.get('/times', invokeTimeController('pegaTodos'));
  router.get('/times/:id', invokeTimeController('pegaUmPorId'));
  router.post('/times', invokeTimeController('criaRegistro'));
  router.put('/times/:id', invokeTimeController('atualizaRegistro'));
  router.delete('/times/:id', invokeTimeController('excluiRegistro'));

  return router;
};
