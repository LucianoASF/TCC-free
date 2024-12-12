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
    const dados = await this.pegaUmPorIdCliente(Number(id), Number(clienteId));
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
  async listaTodosOsDevsCandidatosPorPedido(id, idCliente) {
    const pedido = await this.pegaUmPorIdCliente(id, idCliente);
    const candidatos = await pedido.getCandidatos();
    return candidatos;
  }
  async listaTodosOsTimesCandidatosPorPedido(id, idCliente) {
    const pedido = await this.pegaUmPorIdCliente(id, idCliente);
    const times = await pedido.getTimes();
    return times;
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
    const ehAdmin = await this.usuarioTimeService.verificaSeODevEhAdmin(
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
  async selecionaCandidato(idPedido, idCliente, idTime = null, idDev = null) {
    const pedido = await this.pegaUmRegistroPorId(idPedido);
    const verificaSeUmTimeEstaAceito = await pedido.getTimes({
      where: { '$TimePedidoSoftware.aceito$': true },
    });
    const verificaSeUmDevEstaAceito = await pedido.getCandidatos({
      where: { '$UsuarioPedidoSoftware.aceito$': true },
    });
    if (
      verificaSeUmDevEstaAceito.length > 0 ||
      verificaSeUmTimeEstaAceito.length > 0
    ) {
      const error = new Error('Esse pedido já tem desenvolvedor(es)');
      error.status = 400;
      throw error;
    }

    if (idCliente !== pedido.cliente_id) {
      const error = new Error(
        'Você só pode selecionar o candidato para seus pedidos de software',
      );
      error.status = 403;
      throw error;
    }
    if (idTime) {
      const time = await this.timeService.pegaUmRegistroPorId(idTime);
      const oTimeSeCandidatou = await pedido.hasTimes(time);
      if (!oTimeSeCandidatou) {
        const error = new Error('Esse time não se candidatou!');
        error.status = 400;
        throw error;
      }
      pedido.setTimes(time.id, {
        through: { aceito: true },
      });
      pedido.setCandidatos([]);
    }
    if (idDev) {
      const dev = await this.usuarioService.pegaUmRegistroPorId(idDev);
      const oDevSeCandidatou = await pedido.hasCandidatos(dev);
      if (!oDevSeCandidatou) {
        const error = new Error('Esse desenvolvedor não se candidatou!');
        error.status = 400;
        throw error;
      }
      await pedido.setCandidatos(dev.id, {
        through: { aceito: true },
      });

      pedido.setTimes([]);
    }
  }

  async finalizaPedidoDevOuTime(idPedido, idDev = null, idTime = null) {
    const pedido = await this.pegaUmRegistroPorId(idPedido);
    if (idDev && !idTime) {
      const desenvolvedor = await this.usuarioService.pegaUmRegistroPorId(
        idDev,
      );
      const temOCandidatoEEstaAceito = await pedido.hasCandidatos(
        desenvolvedor,
        {
          where: { '$UsuarioPedidoSoftware.aceito$': true },
        },
      );

      if (temOCandidatoEEstaAceito) {
        pedido.finalizado_desenvolvedor = true;

        await this.repository.finalizaPedidoDevOuTime(pedido);
        console.log(pedido.finalizado_cliente);

        if (pedido.finalizado_cliente === true) {
          await this.excluiRegistro(pedido.id);
        }
      }
    } else if (!idDev && idTime) {
      const ehAdmin = await this.usuarioTimeService.verificaSeODevEhAdmin(
        idDev,
        idTime,
      );
      if (!ehAdmin) {
        const error = new Error('Você não é admin');
        error.status = 403;
        throw error;
      }
      const time = await this.timeService.pegaUmRegistroPorId(idTime);
      const temOCandidatoEEstaAceito = await pedido.hasTimes(time, {
        where: { '$TimePedidoSoftware.aceito$': true },
      });
      if (temOCandidatoEEstaAceito) {
        pedido.finalizado_desenvolvedor = true;
        await this.repository.finalizaPedidoDevOuTime(pedido);
        console.log(pedido.finalizado_cliente);

        if (pedido.finalizado_cliente === true) {
          await this.excluiRegistro(pedido.id);
        }
      }
    }
  }
  async finalizaPedidoCliente(idPedido, idCliente) {
    const pedido = await this.pegaUmPorIdCliente(idPedido, idCliente);
    const temTimeAceito = await pedido.getTimes({
      where: { '$TimePedidoSoftware.aceito$': true },
    });
    const temDevAceito = await pedido.getCandidatos({
      where: { '$UsuarioPedidoSoftware.aceito$': true },
    });
    if (temTimeAceito.length === 0 && temDevAceito.length === 0) {
      const error = new Error(
        'Não tem nenhum desenvolvedor ou time aceito no seu pedido de software',
      );
      error.status = 400;

      throw error;
    }
    pedido.finalizado_cliente = true;
    await this.repository.finalizaPedidoCliente(pedido);
    console.log(pedido.finalizado_desenvolvedor);
    if (pedido.finalizado_desenvolvedor === true) {
      await this.excluiRegistro(pedido.id);
    }
  }
  async verificaSeODevJaFinalizou(idPedido) {
    const pedido = await this.pegaUmRegistroPorId(idPedido);
    if (pedido.finalizado_desenvolvedor) {
      return { finalizado: true };
    }
  }
  async verificaSeOClienteJaFinalizou(idPedido) {
    const pedido = await this.pegaUmRegistroPorId(idPedido);
    if (pedido.finalizado_cliente) {
      return { finalizado: true };
    }
  }
  async pegaTimeAceitoPorPedido(id) {
    const pedido = await this.pegaUmRegistroPorId(id);
    const time = await pedido.getTimes({
      where: { '$TimePedidoSoftware.aceito$': true },
    });
    return time[0];
  }
}

module.exports = PedidosSoftwareService;
