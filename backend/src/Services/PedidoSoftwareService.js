const Service = require('./Service.js');

class PedidosSoftwareService extends Service {
  constructor({
    pedidoSoftwareRepository,
    usuarioService,
    timeService,
    usuarioTimeService,
  }) {
    super(pedidoSoftwareRepository);
    this.usuarioService = usuarioService;
    this.timeService = timeService;
    this.usuarioTimeService = usuarioTimeService;
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
      const item = await pedido.getCandidatos({
        where: { '$UsuarioPedidoSoftware.aceito$': true },
      });
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
  async listaTodosOsDevsETimesCandidatosPorPedido(id, idCliente) {
    const pedido = await this.pegaUmPorIdCliente(id, idCliente);
    const candidatos = await pedido.getCandidatos();
    const times = await pedido.getTimes();
    return [...candidatos, ...times];
  }
  async candidataSolo(id, idPedido) {
    const desenvolvedor = await this.usuarioService.pegaUmRegistroPorId(id);
    const pedido = await this.pegaUmRegistroPorId(idPedido);
    await pedido.addCandidatos(desenvolvedor, {
      through: { aceito: false },
    });
  }
  async verificaSeJaSeCandidatouDevSolo(id, idDesenvolvedor) {
    const pedido = await this.pegaUmRegistroPorId(id);
    const verifica = await pedido.hasCandidato(idDesenvolvedor);
    return verifica;
  }
  async candidataTime(idDesenvolvedor, idPedido, idTime) {
    const ehAdmin = this.usuarioTimeService.verificaSeODevEhAdmin(
      idDesenvolvedor,
      idTime,
    );
    if (!ehAdmin) {
      const error = new Error('Você não é admin');
      error.status = 403;
      throw error;
    }
    const pedido = await this.pegaUmRegistroPorId(idPedido);
    const time = await this.timeService.pegaUmRegistroPorId(idTime);
    await pedido.addTimes(time, { through: { aceito: false } });
  }
  async verificaSeJaSeCandidatouTime(idPedido, idTime) {
    const pedido = await this.pegaUmRegistroPorId(idPedido);
    const time = await this.timeService.pegaUmRegistroPorId(idTime);
    const verifica = await pedido.hasTime(time);
    return verifica;
  }
}

module.exports = PedidosSoftwareService;
