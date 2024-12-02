const Repository = require('./Repository.js');
const dataSource = require('../database/models');

class TimeRepository extends Repository {
  constructor() {
    super('Time');
  }
  async pegaUmRegistroPorIdComUsuario(id) {
    return dataSource.Time.findByPk(id, {
      include: { model: dataSource.Usuario },
    });
  }
  async pegaTodosOstimesDoDesenvolvedor(idDesenvolvedor) {
    const timesDoDesenvolvedor = await dataSource.Time.findAll({
      include: { model: dataSource.Usuario },
      where: { '$Usuarios.UsuarioTime.desenvolvedor_id$': idDesenvolvedor },
    });
    if (!timesDoDesenvolvedor) {
      const error = new Error('Nenhum time encontrado');
      error.status = 404;
      throw error;
    }
    let timesComTodosOsDesenvolvedores = [];
    for (const time of timesDoDesenvolvedor) {
      const timeComDevs = await this.pegaUmRegistroPorIdComUsuario(time.id);
      timesComTodosOsDesenvolvedores.push(timeComDevs);
    }
    return timesComTodosOsDesenvolvedores;
  }
  async pegaTodosOsTimesAceitandoMembros() {
    const times = await dataSource.Time.findAll({
      include: { model: dataSource.Usuario },
      where: { aceitando_membros: true },
    });
    return times;
  }
}

module.exports = TimeRepository;
