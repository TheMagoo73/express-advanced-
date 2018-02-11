var chai = require('chai');
chai.should();

const middleware = require('../lib/middleware.js');

describe('middleware', ()=>{

    it('can parse a single simple media type', ()=>{
        var req = {get: ()=>'application/json'};

        middleware(req, {}, ()=>{});
        req.acceptTypes.should.be.an('array', 'acceptTypes should be an array')
        req.acceptTypes.length.should.equal(1, 'acceptTypes should have a single element')
        req.acceptTypes[0].should.deep.equal({type: 'application/json'});
    })

    it('can parse multiple simple media types', ()=>{
        var req = {get: ()=>'application/json, application/xml'};

        middleware(req, {}, ()=>{});
        req.acceptTypes.should.be.an('array', 'acceptTypes should be an array')
        req.acceptTypes.length.should.equal(2, 'acceptTypes should have a two elements')
        req.acceptTypes[0].should.deep.equal({type: 'application/json'});
        req.acceptTypes[1].should.deep.equal({type: 'application/xml'});
    })

    it('can extract version information', ()=>{
        var req = {get: ()=>'application/vnd.example.foo+json;version=2'};

        middleware(req, {}, ()=>{});
        req.acceptTypes.should.be.an('array', 'acceptTypes should be an array');
        req.acceptTypes.length.should.equal(1, 'acceptTypes should have a single element')      
        req.acceptTypes[0].version.should.equal(2, 'acceptTypes[0] should be version 2')
    })
    

})