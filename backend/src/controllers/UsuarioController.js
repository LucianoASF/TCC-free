const Controller = require('./Controller.js');

class UsuarioController extends Controller {
  constructor({ usuarioService }) {
    super(usuarioService);
  }
}

module.exports = UsuarioController;
