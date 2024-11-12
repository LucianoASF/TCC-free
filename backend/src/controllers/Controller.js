class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
  async pegaUmPorId(req, res) {
    try {
      const registro = await this.entidadeService.pegaUmRegistroPorId(
        req.params.id,
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
      const novoRegistro = await this.entidadeService.criaRegistro(req.body);
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
    try {
      const registroAtualizado = await this.entidadeService.atualizaRegistro(
        req.body,
        req.params.id,
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
    try {
      await this.entidadeService.excluiRegistro(req.params.id);
      return res.status(204).json({ msg: 'Registro excluido com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Controller;
