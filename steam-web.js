var webClient = require('./api/webclient');
var factories = require('./api/factories');

module.exports = {
    WebClient: webClient,
    connectionFactories: factories
};