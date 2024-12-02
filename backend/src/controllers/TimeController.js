const Controller = require('./Controller.js');

class TimeController extends Controller {
  constructor({ timeService }) {
    super(timeService);
  }
  async pegaTodosOstimesDoDesenvolvedor(req, res) {
    if (req.usuario.id !== Number(req.params.desenvolvedor_id))
      return res.status(403).json({
        error: 'Não autorizado',
      });
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
  async criaRegistro(req, res) {
    try {
      const novoRegistro = await this.entidadeService.criaRegistro(
        req.body,
        req.usuario.id,
      );
      return res.status(201).json(novoRegistro);
    } catch (error) {
      if (error.status === 400) {
        return res.status(400).json({ error: error.message });
      }
      if (error.name === 'SequelizeValidationError') {
        return res.status(422).json({
          message: error.errors.map((err) => err.message),
        });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async excluiRegistro(req, res) {
    if (req.usuario.id !== Number(req.params.desenvolvedor_id))
      return res.status(403).json({
        error: 'Não autorizado',
      });
    try {
      await this.entidadeService.excluiRegistro(
        req.params.desenvolvedor_id,
        req.params.id,
      );
      return res.status(204).json({ msg: 'Registro excluido com sucesso' });
    } catch (error) {
      if (error.status === 400) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async pegaTodosOsPedidosDoTime(req, res) {
    try {
      const registros = await this.entidadeService.pegaTodosOsPedidosDoTime(
        req.params.id,
      );
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async excluiMembro(req, res) {
    try {
      await this.entidadeService.excluiMembro(
        req.usuario.id,
        req.params.desenvolvedor_id,
        req.params.id,
      );
      return res.status(204).json({ msg: 'Registro excluido com sucesso' });
    } catch (error) {
      if (error.status === 400) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async pegaTodosOsTimesDisponiveis(req, res) {
    try {
      const times = await this.entidadeService.pegaTodosOsTimesDisponiveis(
        req.usuario.id,
      );
      return res.status(200).json(times);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async adicionaDevAoTime(req, res) {
    try {
      await this.entidadeService.adicionaDevAoTime(
        req.usuario.id,
        req.params.id,
      );
      res.status(200).json();
    } catch (error) {
      if (error.status === 400)
        return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TimeController;
