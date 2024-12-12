const Repository = require('./Repository.js');
const dataSource = require('../database/models');

class PedidoSoftwareRepository extends Repository {
  constructor() {
    super('PedidoSoftware');
  }
  async pegaTodosOsRegistrosPorCliente(clienteId) {
    return dataSource.PedidoSoftware.findAll({
      where: {
        cliente_id: clienteId,
      },
    });
  }
  async pegaUmPorIdCliente(id, clienteId) {
    return dataSource.PedidoSoftware.findOne({
      where: { id, cliente_id: clienteId },
    });
  }
  async criaRegistro(novoRegistro) {
    return dataSource.PedidoSoftware.create(novoRegistro);
  }
  async atualizaRegistro(registroAtualizado, id, clienteId) {
    return dataSource.PedidoSoftware.update(registroAtualizado, {
      where: { id, cliente_id: clienteId },
    });
  }
  async finalizaPedidoDevOuTime(pedido) {
    return dataSource.PedidoSoftware.update(
      { finalizado_desenvolvedor: pedido.finalizado_desenvolvedor },
      {
        where: { id: pedido.id },
      },
    );
  }
  async finalizaPedidoCliente(pedido) {
    return dataSource.PedidoSoftware.update(
      { finalizado_cliente: pedido.finalizado_cliente },
      {
        where: { id: pedido.id },
      },
    );
  }
}

module.exports = PedidoSoftwareRepository;
