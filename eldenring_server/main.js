const apiController = require('./src/api/apiController');

function main(app) {
  apiController.route(app);
}

module.exports = main;