const { Router } = require('express');
const { autentica, autoriza } = require('../middlewares/auth');

function criarUsuariosRoutes(usuarioController, pedidoSoftwareController) {
  const router = Router();
  router.get('/usuarios', (req, res) => usuarioController.pegaTodos(req, res));
  router.get('/usuarios/:id', (req, res) =>
    usuarioController.pegaUmPorId(req, res),
  );
  router.post('/usuarios', (req, res) =>
    usuarioController.criaRegistro(req, res),
  );
  router.put('/usuarios/:id', (req, res) =>
    usuarioController.atualizaRegistro(req, res),
  );
  router.delete('/usuarios/:id', (req, res) =>
    usuarioController.excluiRegistro(req, res),
  );
  router.get(
    '/usuarios/clientes/:cliente_id/pedidos-softwares',
    autentica,
    autoriza('cliente'),
    (req, res) =>
      pedidoSoftwareController.pegaTodosOsRegistrosPorCliente(req, res),
  );
  router.get(
    '/usuarios/clientes/:cliente_id/pedidos-softwares/:id',
    (req, res) => pedidoSoftwareController.pegaUmPorId(req, res),
  );
  router.post('/usuarios/clientes/:cliente_id/pedidos-softwares', (req, res) =>
    pedidoSoftwareController.criaRegistro(req, res),
  );
  router.put(
    '/usuarios/clientes/:cliente_id/pedidos-softwares/:id',
    autentica,
    autoriza('cliente'),
    (req, res) => pedidoSoftwareController.atualizaRegistro(req, res),
  );
  router.delete(
    '/usuarios/clientes/:cliente_id/pedidos-softwares/:id',
    autentica,
    autoriza('cliente'),
    (req, res) => pedidoSoftwareController.excluiRegistro(req, res),
  );
  router.get('/usuarios/pedidos-softwares/disponiveis', (req, res) =>
    pedidoSoftwareController.pegaTodosOsRegistrosSemDev(req, res),
  );
  return router;
}

module.exports = criarUsuariosRoutes;
