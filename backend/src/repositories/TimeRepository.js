const Repository = require('./Repository.js');
const dataSource = require('../database/models');

class TimeRepository extends Repository {
  constructor() {
    super('Time');
  }
  async pegaTodosOstimesDoDesenvolvedor(idDesenvolvedor) {
    return dataSource.Time.findAll({
      include: { model: dataSource.Usuario },

      where: { '$Usuarios.UsuarioTime.desenvolvedor_id$': idDesenvolvedor },
    });
  }
}

module.exports = TimeRepository;
