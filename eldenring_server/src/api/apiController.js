const { api } = require('../libs/api');
const weaponController = require('./weaponController');
const skillController = require('./skillController');
const magicController = require('./magicController');
const prayController = require('./prayController');

module.exports.route = (app) => {
  api.init(app);

  const param = { app, api };

  weaponController.route(param);
  skillController.route(param);
  magicController.route(param);
  prayController.route(param);
}