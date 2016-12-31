'use strict';

// TODO:
// const Promise = require('bluebird')
// const mkdirp = require('mkdirp')
var Promise = require('bluebird')
var mkdirp = require('mkdirp')

exports = module.exports = function mkdirpBluebird(dir, opts) {
	return new Promise(function (resolve, reject) {
		mkdirp(dir, opts, function (err, made) {
			if (err) {
				reject(err);
			} else {
				resolve(made);
			}
		})
	})
}
