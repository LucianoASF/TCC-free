const { Router } = require('express');

function criarTimesRoutes(timeController) {
  const router = Router();
  router.get('/times', (req, res) => timeController.pegaTodos(req, res));
  router.get('/times/:id', (req, res) => timeController.pegaUmPorId(req, res));
  router.post('/times', (req, res) => timeController.criaRegistro(req, res));
  router.put('/times/:id', (req, res) =>
    timeController.atualizaRegistro(req, res),
  );
  router.delete('/times/:id', (req, res) =>
    timeController.excluiRegistro(req, res),
  );
  return router;
}

module.exports = criarTimesRoutes;
