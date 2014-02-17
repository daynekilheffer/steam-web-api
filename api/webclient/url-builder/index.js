function getParameters(parameters) {
    var params = [];
    parameters = parameters || {};

    for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            params.push({
                key: key,
                val: parameters[key]
            });
        }
    }
    return params.map(function(param) {
        return param.key + '=' + param.val;
    });
}

function createUrl(gameName, apiName, parameters) {
    var params = getParameters(parameters);
    return 'http://api.steampowered.com/' + gameName + '/' + apiName + '?' + getParameters(parameters).join('&');
}


module.exports = {
    createUrl: createUrl
};
    