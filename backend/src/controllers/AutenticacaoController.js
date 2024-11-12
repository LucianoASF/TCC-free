class AutenticacaoController {
  constructor(autenticacaoService) {
    this.autenticacaoService = autenticacaoService;
  }
  async login(req, res) {
    try {
      const tokenJWT = await this.autenticacaoService.login(req.body);
      return res.status(200).json(tokenJWT);
    } catch (error) {
      if (error.status === 404) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AutenticacaoController;
