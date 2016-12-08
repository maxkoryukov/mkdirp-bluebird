'use strict'

var mkdirpromise  = require('..');


describe('Package', () => {
	it('should export a function', () => {
		expect(mkdirpromise).to.be.a('function');
	})
})
