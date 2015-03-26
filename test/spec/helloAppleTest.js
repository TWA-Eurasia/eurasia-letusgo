'use strict';

var sayHello = require('../../model/helloApple.js');

describe('helloApple', function(){
    it('sayHello should return helloApple', function() {

        expect(sayHello()).to.equal('hello apple!');
    })
});