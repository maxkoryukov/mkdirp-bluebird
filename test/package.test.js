'use strict';

var mkdirpromise  = require('..');


describe('Package', function() {
	it('should export a function', function() {
		expect(mkdirpromise).to.be.a('function');
	})
})
