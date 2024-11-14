// usuariosRoute.js
const { Router } = require('express');
const { makeInvoker } = require('awilix-express');
const { autentica, autoriza } = require('../middlewares/auth');

module.exports = () => {
  const router = Router();

  // Configuração para `usuarioController` e `pedidoSoftwareController`
  const invokeUsuarioController = makeInvoker(
    (container) => container.usuarioController,
  );
  const invokePedidoSoftwareController = makeInvoker(
    (container) => container.pedidoSoftwareController,
  );

  // Rotas de usuários
  router.get('/usuarios', invokeUsuarioController('pegaTodos'));
  router.get('/usuarios/:id', invokeUsuarioController('pegaUmPorId'));
  router.post('/usuarios', invokeUsuarioController('criaRegistro'));
  router.put('/usuarios/:id', invokeUsuarioController('atualizaRegistro'));
  router.delete('/usuarios/:id', invokeUsuarioController('excluiRegistro'));

  // Rotas de pedidos de software dos clientes
  router.get(
    '/usuarios/clientes/:cliente_id/pedidos-softwares',
    autentica,
    autoriza('cliente'),
    invokePedidoSoftwareController('pegaTodosOsRegistrosPorCliente'),
  );
  router.get(
    '/usuarios/clientes/:cliente_id/pedidos-softwares/:id',
    invokePedidoSoftwareController('pegaUmPorIdCliente'),
  );
  router.post(
    '/usuarios/clientes/:cliente_id/pedidos-softwares',
    invokePedidoSoftwareController('criaRegistro'),
  );
  router.put(
    '/usuarios/clientes/:cliente_id/pedidos-softwares/:id',
    autentica,
    autoriza('cliente'),
    invokePedidoSoftwareController('atualizaRegistro'),
  );
  router.delete(
    '/usuarios/clientes/:cliente_id/pedidos-softwares/:id',
    autentica,
    autoriza('cliente'),
    invokePedidoSoftwareController('excluiRegistro'),
  );
  router.get(
    '/usuarios/pedidos-softwares/disponiveis',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('pegaTodosOsRegistrosSemDev'),
  );

  return router;
};
