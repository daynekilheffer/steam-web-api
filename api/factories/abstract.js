var request = require('request');

function AbstractConnectionFactory() {}

AbstractConnectionFactory.prototype._executeRequest = function (url, callback) {
    request(url, function (error, resp, body) {
        if (error) {
            callback(error);
        } else if (resp.statusCode === 200) {
            callback(null, body);
        } else {
            console.log(resp);
            callback('unrecognized state');
        }

    });
};

AbstractConnectionFactory.prototype.execute = function (request, callback) {
    callback(new Error('this connection factory has not implemented an execute function'), null);
};

module.exports = AbstractConnectionFactory;
