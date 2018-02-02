const urlBuilder = require('./url-builder');

it('should build a url for api consumption of a given game', () => {
    const url = urlBuilder('game1', 'api2')
    expect(url).toEqual('http://api.steampowered.com/game1/api2?')
})
it('should include query parameters in the url', () => {
    const url = urlBuilder('g', 'a', {
        test: 'passing',
        arr: [1,2],
    })
    expect(url).toEqual('http://api.steampowered.com/g/a?test=passing&arr=1&arr=2')
})