const Service = require('./Service.js');
const bcrypt = require('bcrypt');

class UsuarioService extends Service {
  constructor(usuarioRepository) {
    super(usuarioRepository);
    this.repository = usuarioRepository;
  }
  async #pegaUsuarioPorEmail(email) {
    return this.repository.pegaRegistroPorEmail(email);
  }
  async criaRegistro(novoRegistro) {
    const registro = await this.#pegaUsuarioPorEmail(novoRegistro.email);
    if (registro) {
      const error = new Error('Email já existente');
      error.status = 400;
      throw error;
    }
    const hash = await bcrypt.hash(novoRegistro.senha, 10);
    novoRegistro.senha = hash;
    return this.repository.criaRegistro(novoRegistro);
  }
  async atualizaRegistro(registroAtualizado, id) {
    const hash = await bcrypt.hash(registroAtualizado.senha, 10);
    registroAtualizado.senha = hash;
    const listaDeRegistrosAtualizados = await this.repository.atualizaRegistro(
      registroAtualizado,
      Number(id),
    );
    if (listaDeRegistrosAtualizados[0] === 0) {
      const error = new Error('Usuário não encontrado');
      error.status = 404;
      throw error;
    }
    const dados = await super.pegaUmRegistroPorId(Number(id));
    return dados;
  }
}

module.exports = UsuarioService;
