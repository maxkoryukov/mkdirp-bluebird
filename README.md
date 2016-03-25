# mkdirp-bluebird

[![Build Status](https://travis-ci.org/maxkoryukov/mkdirp-bluebird.svg?branch=master)][travis-url]

[Promise] version of [mkdirp]:

> Like mkdir -p, but in node.js!

## Install

```sh
npm install --save mkdirp-bluebird
```

## API

```js
var mkdirp = require('mkdirp-bluebird')
```

### mkdirp(dir, [, options])

*pattern*: `String`
*options*: `Object` or `String`
Return: `Object` ([Promise])

When it finishes, it will be [*fulfilled*](http://bluebirdjs.com/docs/working-with-callbacks.html) with the first directory made that had to be created, if any.

When it fails, it will be [*rejected*](http://bluebirdjs.com/docs/working-with-callbacks.html) with an error as its first argument.

```js
mkdirp('/tmp/foo/bar/baz')
  .then(function (made) {
    console.log(made) //=> '/tmp/foo'
  })

  .catch(function (err) {
    console.error(err)
  })
})
```

#### options

The option object will be directly passed to [mkdirp](https://github.com/substack/node-mkdirp#mkdirpdir-opts-cb).

## License

[MIT License](LICENSE) &copy; Koryukov Maksim


[travis-url]: https://travis-ci.org/maxkoryukov/mkdirp-bluebird

[npm-url]: https://www.npmjs.com/package/mkdirp-bluebird

[david-url]: https://david-dm.org/maxkoryukov/mkdirp-bluebird
[david-image]: https://img.shields.io/david/ahmadnassri/mkdirp-promise.svg?style=flat-square

[mkdirp]: https://github.com/substack/node-mkdirp
[Promise]: http://bluebirdjs.com/
