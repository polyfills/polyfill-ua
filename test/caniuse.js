
var assert = require('assert')

var caniuse = require('../lib/caniuse')

describe('Caniuse', function () {
  it('should work', function () {
    var fn = caniuse('nav-timing')

    assert(fn({
      family: 'ie',
      version: '8.0.0'
    }))

    assert(!fn({
      family: 'ie',
      version: '9.0.0'
    }))

    assert(fn({
      family: 'safari',
      version: '7.1.0'
    }))

    assert(!fn({
      family: 'safari',
      version: '8.0.0'
    }))
  })

  it('return true if the latest is unsupported but not the latest is', function () {
    // because it's not supported in the latest,
    // we should always polyfill because it's probably buggy
    var fn = caniuse('nav-timing')
    assert(fn({
      major: 'ios',
      version: '7.1.0'
    }))

    assert(fn({
      major: 'ios',
      version: '8.0.0'
    }))

    assert(fn({
      major: 'ios',
      version: '8.1.0'
    }))
  })

  it('should return true if no versions support it', function () {
    var fn = caniuse('eventsource')

    assert(fn({
      family: 'ie',
      version: '11.0.0'
    }))

    assert(fn({
      family: 'ie',
      version: '10.0.0'
    }))
  })

  it('should return false for well-supported features', function () {
    var fn = caniuse('calc')

    assert(fn({
      family: 'ie',
      version: '8.0.0'
    }))

    assert(fn({
      family: 'ie',
      version: '9.0.0'
    }))

    assert(!fn({
      family: 'ie',
      version: '10.0.0'
    }))

    assert(!fn({
      family: 'chrome',
      version: '36.0.0'
    }))
  })
})
