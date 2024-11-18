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
}

module.exports = TimeService;
