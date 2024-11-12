const dataSource = require('../database/models');

class Repository {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros() {
    return dataSource[this.model].findAll();
  }
  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }
  async criaRegistro(novoRegistro) {
    return dataSource[this.model].create(novoRegistro);
  }
  async atualizaRegistro(registroAtualizado, id) {
    return dataSource[this.model].update(registroAtualizado, { where: { id } });
  }
  async excluiRegistro(id) {
    await dataSource[this.model].destroy({ where: { id } });
  }
}

module.exports = Repository;
