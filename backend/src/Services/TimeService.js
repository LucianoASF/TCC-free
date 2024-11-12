const Service = require('./Service.js');

class TimeService extends Service {
  constructor(timeRepository) {
    super(timeRepository);
  }
}

module.exports = TimeService;
