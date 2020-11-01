var assert = require('assert');

import {add, mul} from '../add.js'

describe("add function testing", function () {
    it('1+2=3', function() {
        assert.equal(add(1, 2), 3);
    });
    
    it('-1+1=0', function() {
        assert.equal(add(-1, 1), 0);
    });

    it('-1*7=-7', function() {
        assert.equal(mul(-1, 7), -7);
    });
})

