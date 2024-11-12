const { Router } = require('express');

function criarAutenticacaoRoute(autenticacaoController) {
  const router = Router();
  router.post('/login', (req, res) => autenticacaoController.login(req, res));

  return router;
}

module.exports = criarAutenticacaoRoute;
