
# polyfill-ua

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Check whether a user agent requires a polyfill.
Designed to be used with user-agent based polyfills.

You compile objects of browsers and versions,
which denote the __minimum__ version a feature requires.
The compiled function returns `true` __if a polyfill is required__ for that browser.

```js
var browsers = {
  chrome: true, // supported on all versions of chrome
  ie: false, // not supported on any version of chrome,
  safari: 7, // supported on safari 7+. numbers are prefixed with `>= `
  ff: '>= 1.5.3', // supported on ff `1.5.3`. strings __must be semver ranges__
};

var polyfill = require('polyfill-ua').compile(browsers);

polyfill({
  family: 'safari',
  version: '8.0.0'
}); // => false because no polyfill is needed

polyfill({
  family: 'safari',
  version: '6.0.0'
}); // => true because a polyfill is needed
```

You can also compile functions from `caniuse-db`!

```js
var polyfill = require('polyfill-ua').caniuse('imports');

polyfill({
  family: 'chrome',
  version: '38.0.0'
}); // false because you don't need a polyfill!

polyfill({
  family: 'ie',
  version: '8.0.0'
}); // true because you need a polyfill!
```

## API

### var agent = parse(useragent)

### var fn = compile(browsers)

### var fn = caniuse(browsers)

[gitter-image]: https://badges.gitter.im/polyfills/polyfill-ua.png
[gitter-url]: https://gitter.im/polyfills/polyfill-ua
[npm-image]: https://img.shields.io/npm/v/polyfill-ua.svg?style=flat-square
[npm-url]: https://npmjs.org/package/polyfill-ua
[github-tag]: http://img.shields.io/github/tag/polyfills/polyfill-ua.svg?style=flat-square
[github-url]: https://github.com/polyfills/polyfill-ua/tags
[travis-image]: https://img.shields.io/travis/polyfills/polyfill-ua.svg?style=flat-square
[travis-url]: https://travis-ci.org/polyfills/polyfill-ua
[coveralls-image]: https://img.shields.io/coveralls/polyfills/polyfill-ua.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/polyfills/polyfill-ua
[david-image]: http://img.shields.io/david/polyfills/polyfill-ua.svg?style=flat-square
[david-url]: https://david-dm.org/polyfills/polyfill-ua
[license-image]: http://img.shields.io/npm/l/polyfill-ua.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/polyfill-ua.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/polyfill-ua
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
