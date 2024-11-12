const Repository = require('./Repository.js');

class TimeRepository extends Repository {
  constructor() {
    super('Time');
  }
}

module.exports = TimeRepository;
