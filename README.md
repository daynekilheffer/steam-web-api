steam-web-api
==========

```js
const steam = require('steam-web-api');
const factories = steam.factories;

const client = steam.client('<key>');
client.use(factories.throttled.create())
// or
const client = steam.client('<key>', {
    connectionFactory: factories.throttled.create(),
});

client.execute('<game>', '<api>', {'params'}, (err, json) => {...})
```