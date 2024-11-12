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
  async pegaUmPorId(id, clienteId) {
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
  async pegaTodosOsRegistrosSemDev() {
    const todosPedidos = await this.pegaTodosOsRegistros();
    let pedidosSemDev = [];
    todosPedidos.forEach(async (pedido) => {
      const item = await pedido.getCandidatos({ where: { aceito: 0 } });
      pedidosSemDev.push(item);
    });
    return pedidosSemDev;
  }
}

module.exports = PedidoSoftwareRepository;
