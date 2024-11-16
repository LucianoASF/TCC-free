const Service = require('./Service.js');

class PedidosSoftwareService extends Service {
  constructor({ pedidoSoftwareRepository, usuarioService }) {
    super(pedidoSoftwareRepository);
    this.usuarioService = usuarioService;
  }
  async pegaTodosOsRegistrosPorCliente(clienteId) {
    return this.repository.pegaTodosOsRegistrosPorCliente(Number(clienteId));
  }
  async pegaUmPorIdCliente(id, clienteId) {
    const registro = await this.repository.pegaUmPorIdCliente(
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
    const todosPedidos = await this.pegaTodosOsRegistros();
    let idPedidosSemDev = [];
    for (const pedido of todosPedidos) {
      const item = await pedido.getCandidatos();
      item.length === 0 && idPedidosSemDev.push(pedido.id);
    }
    let pedidos = [];
    for (const idPedido of idPedidosSemDev) {
      const pedido = await this.repository.pegaUmRegistroPorId(idPedido);
      pedidos.push(pedido);
    }
    for (const pedido of pedidos) {
      const times = await pedido.getTimes();
      for (const time of times) {
        if (time.TimePedidoSoftware.aceito) {
          pedidos = pedidos.filter((p) => p.id !== pedido.id);
        }
      }
    }
    return pedidos;
  }
  async pegaTodosOsPedidosDesenvolvedor(idDesenvolvedor) {
    idDesenvolvedor = Number(idDesenvolvedor);
    const desenvolvedor = await this.usuarioService.pegaUmRegistroPorId(
      idDesenvolvedor,
    );
    const pedidos = await desenvolvedor.getPedidoSoftware({
      where: { '$UsuarioPedidoSoftware.aceito$': true },
    });
    return pedidos;
  }
}

module.exports = PedidosSoftwareService;
