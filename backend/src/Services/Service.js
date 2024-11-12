class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async pegaTodosOsRegistros() {
    return this.repository.pegaTodosOsRegistros();
  }
  async pegaUmRegistroPorId(id) {
    const registro = await this.repository.pegaUmRegistroPorId(Number(id));
    if (!registro) {
      const error = new Error('Registro não encontrado');
      error.status = 404;
      throw error;
    }
    return registro;
  }
  async criaRegistro(novoRegistro) {
    return this.repository.criaRegistro(novoRegistro);
  }

  async atualizaRegistro(registroAtualizado, id) {
    const listaDeRegistrosAtualizados = await this.repository.atualizaRegistro(
      registroAtualizado,
      Number(id),
    );
    if (listaDeRegistrosAtualizados[0] === 0) {
      const error = new Error('Usuário não encontrado');
      error.status = 404;
      throw error;
    }
    const dados = await this.pegaUmRegistroPorId(Number(id));
    return dados;
  }
  async excluiRegistro(id) {
    await this.repository.excluiRegistro(Number(id));
  }
}

module.exports = Service;
