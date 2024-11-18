// container.js
const { createContainer, asClass, asFunction } = require('awilix');

// Controllers
const UsuarioController = require('./src/controllers/UsuarioController.js');
const TimeController = require('./src/controllers/TimeController.js');
const PedidoSoftwareController = require('./src/controllers/PedidoSoftwareController.js');
const AutenticacaoController = require('./src/controllers/AutenticacaoController.js');
const UsuarioPedidoSoftwareController = require('./src/controllers/UsuarioPedidoSoftwareController.js');

// Services
const UsuarioService = require('./src/Services/UsuarioService.js');
const TimeService = require('./src/Services/TimeService.js');
const PedidoSoftwareService = require('./src/Services/PedidoSoftwareService.js');
const AutenticacaoService = require('./src/Services/AutenticacaoService.js');
const UsuarioPedidoSoftwareService = require('./src/Services/UsuarioPedidoSoftwareService.js');
const UsuarioTimeService = require('./src/Services/UsuarioTimeService.js');

// Repositories
const UsuarioRepository = require('./src/repositories/UsuarioRepository.js');
const TimeRepository = require('./src/repositories/TimeRepository.js');
const PedidoSoftwareRepository = require('./src/repositories/PedidoSoftwareRepository.js');
const UsuarioPedidoSoftwareRepository = require('./src/repositories/UsuarioPedidoSoftwareRepository.js');
const UsuarioTimeRepository = require('./src/repositories/UsuarioTimeRepository.js');

// Routes
const usuariosRoute = require('./src/routes/usuariosRoute.js');
const timesRoute = require('./src/routes/timesRoute.js');
const autenticacaoRoute = require('./src/routes/autenticacaoRoute.js');

const container = createContainer();

// Registrar Repositories
container.register({
  usuarioRepository: asClass(UsuarioRepository).singleton(),
  timeRepository: asClass(TimeRepository).singleton(),
  pedidoSoftwareRepository: asClass(PedidoSoftwareRepository).singleton(),
  usuarioPedidoSoftwareRepository: asClass(
    UsuarioPedidoSoftwareRepository,
  ).singleton(),
  usuarioTimeRepository: asClass(UsuarioTimeRepository).singleton(),
});

// Registrar Services
container.register({
  usuarioService: asClass(UsuarioService).singleton(),
  timeService: asClass(TimeService).singleton(),
  pedidoSoftwareService: asClass(PedidoSoftwareService).singleton(),
  autenticacaoService: asClass(AutenticacaoService).singleton(),
  usuarioPedidoSoftwareService: asClass(
    UsuarioPedidoSoftwareService,
  ).singleton(),
  usuarioTimeService: asClass(UsuarioTimeService).singleton(),
});

// Registrar Controllers
container.register({
  usuarioController: asClass(UsuarioController).singleton(),
  timeController: asClass(TimeController).singleton(),
  pedidoSoftwareController: asClass(PedidoSoftwareController).singleton(),
  autenticacaoController: asClass(AutenticacaoController).singleton(),
  usuarioPedidoSoftwareController: asClass(
    UsuarioPedidoSoftwareController,
  ).singleton(),
});

// Registrar Routes
container.register({
  usuariosRoute: asFunction(usuariosRoute).singleton(),
  timesRoute: asFunction(timesRoute).singleton(),
  autenticacaoRoute: asFunction(autenticacaoRoute).singleton(),
});

module.exports = container;
