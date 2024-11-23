const Controller = require('./Controller.js');

class UsuarioController extends Controller {
  constructor({ usuarioService }) {
    super(usuarioService);
  }
  async pegaPedidosAceitosDosTimes(req, res) {
    if (req.usuario.id !== Number(req.params.id))
      return res.status(403).json({
        error: 'Não autorizado',
      });
    try {
      const registros = await this.entidadeService.pegaPedidosAceitosDosTimes(
        req.params.id,
      );
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async pegaPedidosPendentesDevSolo(req, res) {
    if (req.usuario.id !== Number(req.params.id))
      return res.status(403).json({
        error: 'Não autorizado',
      });
    try {
      const registros = await this.entidadeService.pegaPedidosPendentesDevSolo(
        req.params.id,
      );
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async pegaPedidosPendentesTimesDoDesenvolvedor(req, res) {
    if (req.usuario.id !== Number(req.params.id))
      return res.status(403).json({
        error: 'Não autorizado',
      });
    try {
      const registros =
        await this.entidadeService.pegaPedidosPendentesTimesDoDesenvolvedor(
          req.params.id,
        );
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UsuarioController;
