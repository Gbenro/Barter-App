//const routes = (module.exports = require("next-routes")());
const routes = require("next-routes")();

routes
  .add("/view/:address", "/view/show")
  .add("/barter/:address", "/barter/index");

module.exports = routes;
