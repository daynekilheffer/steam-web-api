const fetch = require('node-fetch');

module.exports = (url, callback) => {
    fetch(url)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            }
            throw resp;
        })
        .then(json => callback(null, json))
        .catch(resp => callback({
            status: resp.status,
            reason: resp.statusText
        }))
}