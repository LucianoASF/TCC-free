const Service = require('./Service.js');

class TimeService extends Service {
  constructor({ timeRepository, usuarioService, usuarioTimeService }) {
    super(timeRepository);
    this.usuarioService = usuarioService;
    this.usuarioTimeService = usuarioTimeService;
  }
  async pegaTodosOstimesDoDesenvolvedor(idDesenvolvedor) {
    return this.repository.pegaTodosOstimesDoDesenvolvedor(
      Number(idDesenvolvedor),
    );
  }
  async criaRegistro(novoRegistro, desenvolvedorId) {
    const time = await this.repository.criaRegistro(novoRegistro);
    const usuario = await this.usuarioService.pegaUmRegistroPorId(
      desenvolvedorId,
    );
    time.addUsuario(usuario, { through: { admin: true } });
    return time;
  }
  async excluiRegistro(idDesenvolvedor, idTime) {
    const ehAdmin = await this.usuarioTimeService.verificaSeODevEhAdmin(
      idDesenvolvedor,
      idTime,
    );

    if (!ehAdmin) {
      const error = new Error('Somente o admin pode excluir o time');
      error.status = 400;
      throw error;
    }
    return this.repository.excluiRegistro(Number(idTime));
  }
  async pegaTodosOsPedidosDoTime(idTime) {
    const time = await this.repository.pegaUmRegistroPorId(Number(idTime));
    const pedidosTime = await time.getPedidoSoftware({
      through: {
        where: { aceito: true },
      },
    });
    return pedidosTime;
  }
  async excluiMembro(idDeQuemQuerExcluir, idDequemVaiSerExcluido, idTime) {
    const ehAdmin = await this.usuarioTimeService.verificaSeODevEhAdmin(
      idDeQuemQuerExcluir,
      idTime,
    );

    if (
      ehAdmin &&
      Number(idDeQuemQuerExcluir) === Number(idDequemVaiSerExcluido)
    ) {
      const error = new Error(
        'Quando você é adimin, você não pode se excluir, é preciso excluir o time',
      );
      error.status = 400;
      throw error;
    }
    if (
      !ehAdmin &&
      Number(idDeQuemQuerExcluir) !== Number(idDequemVaiSerExcluido)
    ) {
      const error = new Error('Você não pode excluir outro membro do time');
      error.status = 400;
      throw error;
    }
    const desenvolvedor = await this.usuarioService.pegaUmRegistroPorId(
      idDequemVaiSerExcluido,
    );
    const time = await this.pegaUmRegistroPorId(idTime);

    await time.removeUsuario(desenvolvedor);
  }
  async pegaTodosOsTimesDisponiveis(idDesenvolvedor) {
    const times = await this.repository.pegaTodosOsTimesAceitandoMembros();
    const desenvolvedor = await this.usuarioService.pegaUmRegistroPorId(
      idDesenvolvedor,
    );
    const timesDoDev = await desenvolvedor.getTimes();
    const timesDisponiveis = [];
    for (const time of times) {
      const verifica = timesDoDev.filter(
        (timeDoDev) => timeDoDev.id === time.id,
      );
      if (verifica.length === 0) {
        timesDisponiveis.push(time);
      }
    }
    return timesDisponiveis;
  }
  async adicionaDevAoTime(idDesenvolvedor, idTime) {
    const desenvolvedor = await this.usuarioService.pegaUmRegistroPorId(
      idDesenvolvedor,
    );
    const time = await this.pegaUmRegistroPorId(idTime);
    if (await time.hasUsuario(desenvolvedor)) {
      const error = new Error('Você ja faz parte desse time');
      error.status = 400;
      throw error;
    }
    await time.addUsuario(desenvolvedor, { through: { admin: false } });
  }
}

module.exports = TimeService;
