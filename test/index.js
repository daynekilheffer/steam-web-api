var inspect = require('eyes').inspector({
    maxLength: 10048
});

var steam = require('..');

var client = steam.client(process.env.STEAM_KEY);
var throttler = steam.factories.throttled(1000);

client.use(throttler);

client.execute('IEconDOTA2_570', 'GetHeroes/v1', {}, function (error, body) {
    inspect(body);
});
