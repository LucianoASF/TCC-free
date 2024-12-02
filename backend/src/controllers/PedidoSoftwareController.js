const Controller = require('./Controller.js');

class PedidoSoftwareController extends Controller {
  constructor({ pedidoSoftwareService }) {
    super(pedidoSoftwareService);
  }
  async pegaTodosOsRegistrosPorCliente(req, res) {
    if (req.usuario.id !== Number(req.params.cliente_id))
      return res.status(403).json({
        error: 'Não autorizado',
      });
    try {
      const registros =
        await this.entidadeService.pegaTodosOsRegistrosPorCliente(
          req.params.cliente_id,
        );
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async pegaUmPorIdCliente(req, res) {
    const { cliente_id, id } = req.params;
    try {
      const registro = await this.entidadeService.pegaUmPorIdCliente(
        id,
        cliente_id,
      );
      return res.status(200).json(registro);
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async criaRegistro(req, res) {
    try {
      const novoRegistro = await this.entidadeService.criaRegistro(
        req.body,
        req.params.cliente_id,
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
  async atualizaRegistro(req, res) {
    if (req.usuario.id !== Number(req.params.cliente_id)) {
      return res.status(403).json({
        error: 'Não autorizado',
      });
    }
    req.body.cliente_id = req.usuario.id;
    try {
      const registroAtualizado = await this.entidadeService.atualizaRegistro(
        req.body,
        req.params.id,
        req.params.cliente_id,
      );
      return res.status(200).json(registroAtualizado);
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ error: error.message });
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
    if (Number(req.params.cliente_id) !== req.usuario.id) {
      return res.status(403).json({
        error: 'Não autorizado',
      });
    }
    try {
      await this.entidadeService.excluiRegistro(req.params.id);
      return res.status(204).json({ msg: 'Registro excluido com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async pegaTodosOsRegistrosSemDev(req, res) {
    try {
      const registros = await this.entidadeService.pegaTodosOsRegistrosSemDev();
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async pegaTodosOsPedidosDesenvolvedor(req, res) {
    if (Number(req.params.desenvolvedor_id) !== req.usuario.id) {
      return res.status(403).json({
        error: 'Não autorizado',
      });
    }
    try {
      const registros =
        await this.entidadeService.pegaTodosOsPedidosDesenvolvedor(
          req.params.desenvolvedor_id,
        );
      return res.status(200).json(registros);
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async listaTodosOsDevsETimesCandidatosPorPedido(req, res) {
    try {
      const registros =
        await this.entidadeService.listaTodosOsDevsETimesCandidatosPorPedido(
          req.params.id,
          req.usuario.id,
        );
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async candidataSolo(req, res) {
    try {
      await this.entidadeService.candidataSolo(
        req.usuario.id,
        req.params.pedido_software_id,
      );
      return res.status(204).json();
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async verificaSeJaSeCandidatouDevSolo(req, res) {
    try {
      const trueOuFalse =
        await this.entidadeService.verificaSeJaSeCandidatouDevSolo(
          req.params.id,
          req.usuario.id,
        );
      return res.status(200).json({ verdadeiro: trueOuFalse });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async candidataTime(req, res) {
    try {
      await this.entidadeService.candidataTime(
        req.usuario.id,
        req.params.pedido_software_id,
        req.params.time_id,
      );
      return res.status(204).json();
    } catch (error) {
      if (error.status === 403)
        return res.status(403).json({ error: error.message });
      return res.status(500).json({ error: error.message });
    }
  }
  async verificaSeJaSeCandidatouTime(req, res) {
    try {
      const trueOuFalse =
        await this.entidadeService.verificaSeJaSeCandidatouTime(
          req.params.pedido_software_id,
          req.params.time_id,
        );
      return res.status(200).json({ verdadeiro: trueOuFalse });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PedidoSoftwareController;
