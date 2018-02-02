const querystring = require('querystring');

module.exports = (gameName, apiName, parameters = {}) => {
    return `http://api.steampowered.com/${gameName}/${apiName}?${querystring.stringify(parameters)}`;
}
