const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

class autenticacaoService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  async login(dados) {
    const usuario = await this.usuarioRepository.pegaRegistroPorEmail(
      dados.email,
    );
    if (!usuario) {
      const error = new Error('Usuário e/ou senha incorretos');
      error.status = 404;
      throw error;
    }
    const verificaSenha = await bcrypt.compare(dados.senha, usuario.senha);
    if (!verificaSenha) {
      const error = new Error('Usuário e/ou senha incorretos');
      error.status = 404;
      throw error;
    }
    const token = jwt.sign({ usuario: usuario }, authConfig.secret, {
      expiresIn: 86400,
    });
    return token;
  }
}

module.exports = autenticacaoService;
