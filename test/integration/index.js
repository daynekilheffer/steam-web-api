var inspect = require('eyes').inspector({
    maxLength: 2048
});

var steamWebApi = require('../../');
var config = require('../../steam.config');

console.log(steamWebApi);

var webClient = new steamWebApi.WebClient(config);
var oneSecondThrottled = new steamWebApi.connectionFactories.Throttled(1000);

console.log(webClient);

webClient.use(oneSecondThrottled);

console.log(webClient);

webClient.execute('ISteamWebAPIUtil', 'GetSupportedAPIList/v0001/', {}, function (error, body) {
    var apiList = JSON.parse(body).apilist;
    apiList.interfaces.forEach(function (iface) {
        if (iface.name.match(/DOTA/)) {
            inspect(iface);
        }
    });
});