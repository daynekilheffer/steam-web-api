var requestBuilder = require('./url-builder');

function Steam(config) {
    if (!config) throw 'SteamApi requires a configuration object';
    this._key = config.key;
}

Steam.prototype.use = function (obj) {
    this.connectionFactory = obj;
};

Steam.prototype.execute = function (gameName, apiName, parameters, callback) {
    var params = parameters || {};
    var self = this;
    params.key = self._key;

    var url = requestBuilder.createUrl(gameName, apiName, params);
    this.connectionFactory.execute(url, callback);
};

module.exports = Steam;