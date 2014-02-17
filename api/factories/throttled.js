var inherits = require('inherits');

var AbstractConnectionFactory = require('./abstract');

function ThrottledConnectionFactory(milliseconds) {
    AbstractConnectionFactory.call(this);
    this.milliseconds = milliseconds;
    this._queue = [];
    this._timeoutId = undefined;
}

// TODO something isn't right with how I did inheritance
inherits(ThrottledConnectionFactory, AbstractConnectionFactory);

ThrottledConnectionFactory.prototype.execute = function (url, callback) {
    this._queueRequest(url, callback);
};

ThrottledConnectionFactory.prototype._queueRequest = function (url, callback) {
    this._queue.push({
        url: url,
        callback: callback
    });
    this._run(0);
};

ThrottledConnectionFactory.prototype._run = function (timeout) {
    var self = this;
    if (!self._timeoutId) {
        self._timeoutId = setTimeout(function () {
            var request = self._queue.pop();
            self._executeRequest.call(self, request.url, request.callback);
            self._timeoutId = undefined;
            if (self._queue.length > 0) {
                self._run(self.milliseconds);
            }
        }, timeout);
    }

};

module.exports = ThrottledConnectionFactory;