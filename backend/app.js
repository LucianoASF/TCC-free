const express = require('express');
const removeId = require('./src/middlewares/removeId.js');
const cors = require('cors');
// imports Usuários
const UsuarioController = require('./src/controllers/UsuarioController.js');
const UsuarioService = require('./src/Services/UsuarioService.js');
const UsuarioRepository = require('./src/repositories/UsuarioRepository.js');
const criarUsuariosRoute = require('./src/routes/usuariosRoute.js');
// imports times
const TimeController = require('./src/controllers/TimeController.js');
const TimeService = require('./src/Services/TimeService.js');
const TimeRepository = require('./src/repositories/TimeRepository.js');
const criarTimesRoute = require('./src/routes/timesRoute.js');
// imports pedidos de softwares
const PedidoSoftwareController = require('./src/controllers/PedidoSoftwareController.js');
const PedidoSoftwareService = require('./src/Services/PedidoSoftwareService.js');
const PedidoSoftwareRepository = require('./src/repositories/PedidoSoftwareRepository.js');

// imports autenticação
const AutenticacaoController = require('./src/controllers/AutenticacaoController.js');
const AutenticacaoService = require('./src/Services/AutenticacaoService.js');
const criarAutenticacaoRoute = require('./src/routes/autenticacaoRoute.js');

// imports UsuarioPedidoSoftware
const UsuarioPedidoSoftwareController = require('./src/controllers/UsuarioPedidoSoftwareController.js');
const UsuarioPedidoSoftwareService = require('./src/Services/UsuarioPedidoSoftwareService.js');
const UsuarioPedidoSoftwareRepository = require('./src/repositories/UsuarioPedidoSoftwareRepository.js');

// instâncias pedidos de softwares
const pedidoSoftwareRepository = new PedidoSoftwareRepository();
const pedidoSoftwareService = new PedidoSoftwareService(
  pedidoSoftwareRepository,
);
const pedidoSoftwareController = new PedidoSoftwareController(
  pedidoSoftwareService,
);
// instâncias usuários
const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);
const usuariosRoute = criarUsuariosRoute(
  usuarioController,
  pedidoSoftwareController,
);
// instâncias times
const timeRepository = new TimeRepository();
const timeService = new TimeService(timeRepository);
const timeController = new TimeController(timeService);
const timesRoute = criarTimesRoute(timeController);

// instâncias Autenticação
const autenticacaoService = new AutenticacaoService(usuarioRepository);
const autenticacaoController = new AutenticacaoController(autenticacaoService);
const autenticacaoRoute = criarAutenticacaoRoute(autenticacaoController);

// instâncias UsuarioPedidoSoftware
const usuarioPedidoSoftwareRepository = new UsuarioPedidoSoftwareRepository();
const usuarioPedidoSoftwareService = new UsuarioPedidoSoftwareService(
  usuarioPedidoSoftwareRepository,
);
const usuarioPedidoSoftwareController = new UsuarioPedidoSoftwareController(
  usuarioPedidoSoftwareService,
);

const app = express();
app.use(cors());
app.use(express.json(), removeId, usuariosRoute, timesRoute, autenticacaoRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('servidor escutando!');
});
