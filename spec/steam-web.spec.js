var steam = require('../steam-web');

describe('steam-web', function() {
    it('should expose a WebClient', function () {
        expect(typeof steam.WebClient).toBe('function');
    });
    it('should expose a set of connection factories', function () {
        expect(typeof steam.connectionFactories).toBe('object');
    });
});
