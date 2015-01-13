
var assert = require('assert')

var compile = require('../lib/compile')
var parse = require('../lib/parse')

// http://www.useragentstring.com/pages/Firefox/
var chrome36 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36'
var ie8 = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; Media Center PC 4.0; SLCC1; .NET CLR 3.0.04320)'
var ios51 = 'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
var android403 = 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
var ff31 = 'Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0'
var safari7 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.77.4 (KHTML, like Gecko) Version/7.0.5 Safari/537.77.4'
var opera1214 = 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14'
var ios81 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4'
var ios8 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4'
var ie11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'

describe('.parse()', function () {
  it('should support falsey', function () {
    var agent = parse(null)
    assert(/unknown/i.test(agent.family))
  })

  it('useragent strings', function () {
    var agent = parse(chrome36)
    assert(agent.family.match(/\bchrome\b/i))
    assert.equal('36', agent.major)
  })

  it('objects', function () {
    var agent = parse({
      family: 'chrome',
      major: 36
    })
    assert(agent.family.match(/\bchrome\b/i))
    assert.equal('36', agent.major)
  })
})

describe('.compile()', function () {
  it('should favor ios over safari', function () {
    var fn = compile({
      ios: 7,
      safari: 6
    })
    assert(!fn({
      family: 'mobile safari',
      major: 7
    }))

    assert(fn({
      family: 'mobile safari',
      major: 6
    }))

    assert(!fn({
      family: 'safari',
      major: 7
    }))

    assert(!fn({
      family: 'safari',
      major: 6
    }))

    assert(fn({
      family: 'safari',
      major: 5
    }))
  })

  it('should compile semver', function () {
    assert(!compile({
      android: '>= 4.0.3'
    })({
      family: 'android',
      version: '4.0.3'
    }))

    assert(compile({
      android: '> 4.0.3'
    })({
      family: 'android',
      version: '4.0.3'
    }))
  })

  it('should always return false if browser: true', function () {
    assert(!compile({
      ie: true
    })({
      family: 'ie',
      version: '11.0.0'
    }))

    assert(!compile({
      ie: true
    })({
      family: 'ie',
      version: '10.0.0'
    }))
  })

  it('should always return true if browser: false', function () {
    assert(compile({
      ie: false
    })({
      family: 'ie',
      version: '11.0.0'
    }))

    assert(compile({
      ie: false
    })({
      family: 'ie',
      version: '10.0.0'
    }))
  })
})
