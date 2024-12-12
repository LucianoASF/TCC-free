// timesRoute.js
const { Router } = require('express');
const { makeInvoker } = require('awilix-express');
const { autentica, autoriza } = require('../middlewares/auth');

module.exports = () => {
  const router = Router();

  // Criamos uma função que invoca o `timeController` do container
  const invokeTimeController = makeInvoker(
    (container) => container.timeController,
  );

  // Definindo as rotas para `timeController`
  router.get('/times', invokeTimeController('pegaTodos'));
  router.get(
    '/times/disponiveis',
    autentica,
    autoriza('desenvolvedor'),
    invokeTimeController('pegaTodosOsTimesDisponiveis'),
  );
  router.get('/times/:id', invokeTimeController('pegaUmPorId'));
  router.post(
    '/times',
    autentica,
    autoriza('desenvolvedor'),
    invokeTimeController('criaRegistro'),
  );
  router.put(
    '/times/:id',
    autentica,
    autoriza('desenvolvedor'),
    invokeTimeController('atualizaRegistro'),
  );
  router.delete(
    '/times/:id/desenvolvedor/:desenvolvedor_id',
    autentica,
    autoriza('desenvolvedor'),
    invokeTimeController('excluiRegistro'),
  );
  router.get(
    '/times/desenvolvedor/:desenvolvedor_id',
    autentica,
    autoriza('desenvolvedor'),
    invokeTimeController('pegaTodosOstimesDoDesenvolvedor'),
  );
  router.get(
    '/times/:id/pedidos-de-softwares',
    invokeTimeController('pegaTodosOsPedidosDoTime'),
  );
  router.delete(
    '/times/:id/desenvolvedor/:desenvolvedor_id/membro',
    autentica,
    autoriza('desenvolvedor'),
    invokeTimeController('excluiMembro'),
  );
  router.post(
    '/times/:id/desenvolvedor/adiciona-membro',
    autentica,
    autoriza('desenvolvedor'),
    invokeTimeController('adicionaDevAoTime'),
  );
  return router;
};
