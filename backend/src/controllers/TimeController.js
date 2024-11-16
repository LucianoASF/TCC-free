const Controller = require('./Controller.js');

class TimeController extends Controller {
  constructor({ timeService }) {
    super(timeService);
  }
  async pegaTodosOstimesDoDesenvolvedor(req, res) {
    try {
      const registros =
        await this.entidadeService.pegaTodosOstimesDoDesenvolvedor(
          req.params.desenvolvedor_id,
        );
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TimeController;
