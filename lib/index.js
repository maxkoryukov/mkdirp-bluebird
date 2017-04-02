'use strict'

const Promise = require('bluebird')
const mkdirp = require('mkdirp')

exports = module.exports = function mkdirpBluebird(dir, opts) {
	return new Promise(function (resolve, reject) {
		mkdirp(dir, opts, function (err, result) {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}
