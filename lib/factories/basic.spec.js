const rewire = require('rewire')
const basic = rewire('./basic')

const mockFetch = jasmine.createSpy();

basic.__set__('fetch', mockFetch);

it('should fetch data', () => {
    const cb = jasmine.createSpy();
    
    mockFetch.and.returnValue(new Promise((res, rej) => res()))
    
    basic('my-url', cb);
    
    expect(mockFetch).toHaveBeenCalledWith('my-url');
})

it('should resolve successful api calls as json', (done) => {
    const fetchResult = {
        ok: true,
        json: jasmine.createSpy(),
    }
    fetchResult.json.and.returnValue({
        data: 'mine',
    })
    
    fetchPromise = Promise.resolve(fetchResult)
    mockFetch.and.returnValue(fetchPromise)
    
    basic('my-url', (err, body) => {
        expect(err).toBe(null);
        expect(body).toEqual({
            data: 'mine',
        })
        done();
    })
})
it('should reject failed api calls with context', (done) => {
    const fetchResult = {
        status: 'ERR',
        statusText: 'whooops',
    }
    
    fetchPromise = Promise.reject(fetchResult)
    mockFetch.and.returnValue(fetchPromise)
    
    basic('my-url', (err, body) => {
        expect(err).toEqual({
            status: 'ERR',
            reason: 'whooops',
        })
        expect(body).toBeUndefined()
        done();
    })
})
it('should reject non-ok api calls with context', (done) => {
    const fetchResult = {
        ok: false,
        status: 500,
        statusText: 'whoops',
    }
    
    fetchPromise = Promise.resolve(fetchResult)
    mockFetch.and.returnValue(fetchPromise)
    
    basic('my-url', (err, body) => {
        expect(err).toEqual({
            status: 500,
            reason: 'whoops',
        })
        expect(body).toBeUndefined()
        done();
    })
})
