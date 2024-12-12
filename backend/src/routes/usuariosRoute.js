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
  router.get(
    '/usuarios/:id/times/pedidos-softwares',
    autentica,
    autoriza('desenvolvedor'),
    invokeUsuarioController('pegaPedidosAceitosDosTimes'),
  );
  router.get(
    '/usuarios/:id/times/pedidos-softwares/pendentes',
    autentica,
    autoriza('desenvolvedor'),
    invokeUsuarioController('pegaPedidosPendentesTimesDoDesenvolvedor'),
  );
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
    autentica,
    autoriza('cliente'),
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
  router.get(
    '/usuarios/desenvolvedor/:desenvolvedor_id/pedidos-softwares',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('pegaTodosOsPedidosDesenvolvedor'),
  );
  router.get(
    `/usuarios/desenvolvedor/:id/pedidos-softwares/candidatados`,
    autentica,
    autoriza('desenvolvedor'),
    invokeUsuarioController('pegaPedidosPendentesDevSolo'),
  );
  router.get(
    '/usuarios/clientes/pedidos-softwares/:id/candidatos/desenvolvedores',
    autentica,
    autoriza('cliente'),
    invokePedidoSoftwareController('listaTodosOsDevsCandidatosPorPedido'),
  );
  router.get(
    '/usuarios/clientes/pedidos-softwares/:id/candidatos/times',
    autentica,
    autoriza('cliente'),
    invokePedidoSoftwareController('listaTodosOsTimesCandidatosPorPedido'),
  );
  router.post(
    '/usuarios/desenvolvedor/pedidos-softwares/:pedido_software_id',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('candidataSolo'),
  );
  router.get(
    '/usuarios/desenvolvedor/pedidos-softwares/:id/verifica-candidatura',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('verificaSeJaSeCandidatouDevSolo'),
  );
  router.get(
    '/usuarios/desenvolvedor/times/admin',
    autentica,
    autoriza('desenvolvedor'),
    invokeUsuarioController('pegatodosOsTimesQueODevEhAdmin'),
  );
  router.post(
    '/usuarios/desenvolvedor/pedidos-softwares/:pedido_software_id/time/:time_id',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('candidataTime'),
  );
  router.get(
    '/usuarios/desenvolvedor/pedidos-softwares/:pedido_software_id/time/:time_id/verifica-candidatura',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('verificaSeJaSeCandidatouTime'),
  );
  router.put(
    '/usuarios/clientes/pedidos-softwares/:pedido_software_id/time/:time_id/desenvolvedor/:desenvolvedor_id',
    autentica,
    autoriza('cliente'),
    invokePedidoSoftwareController('selecionaCandidato'),
  );
  router.put(
    '/usuarios/desenvolvedor/:desenvolvedor_id/pedidos-softwares/:pedido_software_id/time/:time_id',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('finalizaPedidoDevOuTime'),
  );
  router.put(
    '/usuarios/clientes/pedidos-softwares/:pedido_software_id',
    autentica,
    autoriza('cliente'),
    invokePedidoSoftwareController('finalizaPedidoCliente'),
  );
  router.get(
    '/usuarios/clientes/pedidos-softwares/:pedido_software_id',
    autentica,
    invokePedidoSoftwareController('verificaSeOClienteJaFinalizou'),
  );
  router.get(
    '/usuarios/desenvolvedor/pedidos-softwares/:pedido_software_id',
    autentica,
    invokePedidoSoftwareController('verificaSeODevJaFinalizou'),
  );
  router.get(
    '/usuarios/desenvolvedor/pedidos-softwares/:pedido_software_id/aceito',
    autentica,
    autoriza('desenvolvedor'),
    invokePedidoSoftwareController('pegaTimeAceitoPorPedido'),
  );

  return router;
};
