'use strict'

var mkdirpromise  = require('..')
var fs            = require('fs')
var path          = require('path')
var rimraf        = require('rimraf')
var mkdirp        = require('mkdirp')
var _             = require('lodash')

var base          = path.join(__dirname, 'tmp')

describe('mkdirp-blubird', () => {
	beforeEach(function (done) {
		mkdirp(base, done)
	})

	afterEach(function (done) {
		rimraf(base, done)
	})

	describe('normal case', function () {

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

				mkdirpromise(file).then(function (made) {
					// should call promise with first-level directory created:
					expect(made).equal(path.resolve(path.join(base, subdirs[0])))

					done();
				})
			})
		});
	})

	describe('should REJECT', () => {
		it('on path is not a string', function () {
			return expect(mkdirpromise(true))
				.to.eventually
				.be.rejected
				.and.be.an.instanceOf(TypeError)
			;
		})

		it('on path containing existing FILE', () => {

			let filePath = path.join(base, 'plain-file.txt')
			fs.closeSync(fs.openSync(filePath, 'w'));
			let dirOverFilePath = path.join(filePath, 'foo');

			return expect(mkdirpromise(dirOverFilePath))
				.to.eventually
				.be.rejected
				.and.be.an.instanceOf(Error)
				.and.have.property('code', 'ENOTDIR')
			;
		})
	})
})
