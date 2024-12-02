const Service = require('./Service.js');
const bcrypt = require('bcrypt');

class UsuarioService extends Service {
  constructor({ usuarioRepository }) {
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
  async pegaPedidosAceitosDosTimes(idDesenvolvedor) {
    const desenvolvedor = await this.pegaUmRegistroPorId(
      Number(idDesenvolvedor),
    );
    const times = await desenvolvedor.getTimes();
    let pedidos = [];
    for (const time of times) {
      const pedidosDoTime = await time.getPedidoSoftware({
        where: { '$TimePedidoSoftware.aceito$': true },
      });
      pedidosDoTime.forEach((pedido) =>
        pedidos.push({ ...pedido.toJSON(), nomeTime: time.nome }),
      );
    }
    return pedidos;
  }
  async pegaPedidosPendentesDevSolo(id) {
    const desenvolvedor = await this.pegaUmRegistroPorId(Number(id));
    return desenvolvedor.getPedidoSoftware({
      where: { '$UsuarioPedidoSoftware.aceito$': false },
    });
  }
  async pegaPedidosPendentesTimesDoDesenvolvedor(id) {
    const desenvolvedor = await this.pegaUmRegistroPorId(Number(id));
    const times = await desenvolvedor.getTimes();
    let pedidos = [];
    for (const time of times) {
      const pedidosDoTime = await time.getPedidoSoftware({
        where: { '$TimePedidoSoftware.aceito$': false },
      });
      pedidosDoTime.forEach((pedido) =>
        pedidos.push({ ...pedido.toJSON(), nomeTime: time.nome }),
      );
    }
    return pedidos;
  }
  async pegatodosOsTimesQueODevEhAdmin(id) {
    const desenvolvedor = await this.pegaUmRegistroPorId(id);
    const times = await desenvolvedor.getTimes({
      where: { '$UsuarioTime.admin$': true },
    });
    return times;
  }
}

module.exports = UsuarioService;
