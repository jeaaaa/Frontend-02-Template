var assert = require('assert');

import { parseHTML } from '../src/parser.js'

describe("parser html", function () {
    it('<a></a>', function() {
        let tree = parseHTML('<a></a>')
        // console.log(tree)
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<a href="//google.com"></a>', function() {
        let tree = parseHTML('<a href="//google.com"></a>')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<a href ></a>', function() {
        let tree = parseHTML('<a href ></a>')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<a href class></a>', function() {
        let tree = parseHTML('<a href class></a>')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<a href="//google.com" class></a>', function() {
        let tree = parseHTML('<a href="//google.com" class></a>')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<a class=lp></a>', function() {
        let tree = parseHTML('<a class=lp></a>')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    
    it('<a class=lp/>', function() {
        let tree = parseHTML('<a class=lp/>')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<a id=\'ab\'/>', function() {
        let tree = parseHTML('<a id=\'ab\'/>')
        console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<a />', function() {
        let tree = parseHTML('<a />')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<A /> upper case', function() {
        let tree = parseHTML('<A />')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<>', function() {
        let tree = parseHTML('<>')
        // console.log(tree)
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "text");
    });

})

