const Service = require('./Service.js');

class PedidosSoftwareService extends Service {
  constructor(pedidoSoftwareRepository) {
    super(pedidoSoftwareRepository);
  }
  async pegaTodosOsRegistrosPorCliente(clienteId) {
    return this.repository.pegaTodosOsRegistrosPorCliente(Number(clienteId));
  }
  async pegaUmPorId(id, clienteId) {
    const registro = await this.repository.pegaUmPorId(
      Number(id),
      Number(clienteId),
    );
    if (!registro) {
      const error = new Error('Registro não encontrado');
      error.status = 404;
      throw error;
    }

    return registro;
  }
  async criaRegistro(novoRegistro, clienteId) {
    novoRegistro.cliente_id = Number(clienteId);
    return this.repository.criaRegistro(novoRegistro);
  }
  async atualizaRegistro(registroAtualizado, id, clienteId) {
    const listaDeRegistrosAtualizados = await this.repository.atualizaRegistro(
      registroAtualizado,
      Number(id),
      Number(clienteId),
    );
    if (listaDeRegistrosAtualizados[0] === 0) {
      const error = new Error('Registro não encontrado');
      error.status = 404;
      throw error;
    }
    const dados = await this.pegaUmPorId(Number(id), Number(clienteId));
    return dados;
  }
  async pegaTodosOsRegistrosSemDev() {
    return this.repository.pegaTodosOsRegistrosSemDev();
  }
}

module.exports = PedidosSoftwareService;
