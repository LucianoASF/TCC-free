const Repository = require('./Repository.js');
const dataSource = require('../database/models');

class UsuarioRepository extends Repository {
  constructor() {
    super('Usuario');
  }
  async pegaRegistroPorEmail(email) {
    const registro = await dataSource.Usuario.scope('withPassword').findOne({
      where: { email },
    });
    return registro;
  }
}

module.exports = UsuarioRepository;
