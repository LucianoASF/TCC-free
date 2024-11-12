const Controller = require('./Controller.js');

class TimeController extends Controller {
  constructor(timeService) {
    super(timeService);
  }
}

module.exports = TimeController;
