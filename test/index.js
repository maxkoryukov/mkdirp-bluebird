/* global beforeEach, afterEach, describe, it */

'use strict'

var mkdirpromise  = require('..')
var path          = require('path')
var rimraf        = require('rimraf')
var mkdirp        = require('mkdirp')
var _             = require('lodash')
var debug         = require('debug')('mkdirp-bluebird.test');

require('chai').should();

var base		= path.join('test', 'tmp')

beforeEach(function (done) {
	mkdirp(base, done)
})

afterEach(function (done) {
	rimraf(base, done)
})

describe('node module', function () {
	describe('create dirs', function () {

		_.times(5, function(count){
			it('should successfully create a directory tree. Sample: ' + (count+1), function (done) {

				// generating array of 2-6 folder names
				// each folder name is from 'abcd...890', and its length is random (4, 25)

				var subdirs = _.times(
					_.random(2,6),
					function() {
						return _('abcdefghijklmnopzABCDEF1234567890')
							.sampleSize(_.random(4,25))
							.join('');
					}
				);


				var file = _([base, subdirs])
					.flatten()
					.wrap(_.spread(path.join))
					.value()();

				debug('SAMPLE DIR:', file);

				mkdirpromise(file).then(function (made) {
					// should call promise with first-level directory created:
					made.should.equal(path.resolve(path.join(base, subdirs[0])))

					done();
				})
			})
		});
	})

	it('should catch thrown errors', function (done) {
		mkdirpromise(true).catch(function (err) {
			err.should.match(/^TypeError/)
			done()
		})
	})

	it('should catch errors', function (done) {
		mkdirpromise(path.join('test', 'index.js', 'foo')).catch(function (err) {
			err.code.should.equal('ENOTDIR')
			done()
		})
	})
})
