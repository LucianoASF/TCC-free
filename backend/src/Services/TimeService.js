const Service = require('./Service.js');

class TimeService extends Service {
  constructor({ timeRepository }) {
    super(timeRepository);
  }
  async pegaTodosOstimesDoDesenvolvedor(idDesenvolvedor) {
    return this.repository.pegaTodosOstimesDoDesenvolvedor(
      Number(idDesenvolvedor),
    );
  }
}

module.exports = TimeService;
