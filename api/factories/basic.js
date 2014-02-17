var inherits = require('inherits');

var AbstractConnectionFactory = require('./abstract');

function BasicConnectionFactory() {
    AbstractConnectionFactory.call(this);
}

inherits(BasicConnectionFactory, AbstractConnectionFactory);

BasicConnectionFactory.prototype.execute = function(request, callback) {
    this.executeRequest(request, callback);
};

module.exports = BasicConnectionFactory;