class UsuarioTimeService {
  constructor({ usuarioTimeRepository }) {
    this.usuarioTimeRepository = usuarioTimeRepository;
  }
  async verificaSeODevEhAdmin(idDesenvolvedor, idTime) {
    return this.usuarioTimeRepository.verificaSeODevEhAdmin(
      Number(idDesenvolvedor),
      Number(idTime),
    );
  }
}

module.exports = UsuarioTimeService;
