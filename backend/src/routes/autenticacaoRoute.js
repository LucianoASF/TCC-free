const { Router } = require('express');
const { makeInvoker } = require('awilix-express');

module.exports = () => {
  const router = Router();
  const invokeAutenticacaoController = makeInvoker(
    (container) => container.autenticacaoController,
  );
  router.post('/login', invokeAutenticacaoController('login'));
  return router;
};
