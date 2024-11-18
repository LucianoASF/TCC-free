const dataSource = require('../database/models');
class UsuarioTimeRepository {
  async verificaSeODevEhAdmin(idDesenvolvedor, idTime) {
    const registro = await dataSource.UsuarioTime.findOne({
      where: {
        desenvolvedor_id: idDesenvolvedor,
        time_id: idTime,
        admin: true,
      },
    });

    if (!registro) return false;
    return true;
  }
}

module.exports = UsuarioTimeRepository;
