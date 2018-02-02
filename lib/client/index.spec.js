const rewire = require('rewire')
const client = rewire('.')

const mockUrlBuilder = jasmine.createSpy();

client.__set__('urlBuilder', mockUrlBuilder);


it('should provide a way to create a client', () => {
    const c = client('key')
    expect(c.use).toEqual(jasmine.any(Function))
    expect(c.execute).toEqual(jasmine.any(Function))
})

it('should allow configuration of the api connection factory', () => {
    const myNewFactory = jasmine.createSpyObj({
        execute: null,
    })
    const c = client('key')
    
    c.use(myNewFactory)
    c.execute('game', 'api', {}, jasmine.createSpy())
    
    expect(myNewFactory.execute).toHaveBeenCalled()
})

it('should execute a call to the generated url', () => {
    const myNewFactory = jasmine.createSpyObj({
        execute: null,
    })
    const cbSpy = jasmine.createSpy();
    const c = client('key', {
        connectionFactory: myNewFactory
    })
    
    mockUrlBuilder.and.returnValue('my-url')
    
    c.execute('game', 'api', {fake: 'param'}, cbSpy)
    
    expect(mockUrlBuilder).toHaveBeenCalledWith('game', 'api', {
        fake: 'param',
        key: 'key',
    })
    expect(myNewFactory.execute).toHaveBeenCalledWith('my-url', cbSpy)
})

it('should return execution results via callbacks', () => {
    const connectionFactory = jasmine.createSpyObj({
        execute: null,
    })
    connectionFactory.execute.and.callFake((url, cb) => cb('data'))
    const cbSpy = jasmine.createSpy();
    
    const c = client('key', {connectionFactory})
    
    c.execute('game', 'api', {fake: 'param'}, cbSpy)
    
    expect(cbSpy).toHaveBeenCalledWith('data');
})