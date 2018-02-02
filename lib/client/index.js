const urlBuilder = require('./url-builder');

const client = (key, options = {}) => {
    let factory = options.connectionFactory;
    return {
        use: f => {
            factory = f;
        },
        execute: (game, api, params, cb) => {
            const url = urlBuilder(game, api, Object.assign({key}, params));
            factory.execute(url, cb);
        }
    }
}

module.exports = client;