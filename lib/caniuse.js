
var debug = require('debug')('polyfill-ua:caniuse')
var semver = require('semver')

var compile = require('./compile')

var caniuseBrowsers = {
  ie: 'ie',
  ff: 'firefox',
  chrome: 'chrome',
  safari: 'safari',
  opera: 'opera',
  ios: 'ios_saf',
  android: 'android',
  iep: 'ie_mob',
  chm: 'and_chr',
  ffm: 'and_ff',
}

module.exports = function (feature) {
  var json = require('caniuse-db/features-json/' + feature + '.json')
  var browsers = {}
  Object.keys(caniuseBrowsers).forEach(function (browser) {
    browsers[browser] = '>= ' + lowestOf(json.stats[caniuseBrowsers[browser]], browser, feature) || false
  })
  return compile(browsers)
}

function lowestOf(obj, browser, feature) {
  // versions are listed in ascending order
  var versions = Object.keys(obj).filter(function (version) {
    if (~version.indexOf('-')) return true;
    return semver.validRange(version);
  }).sort(function (a, b) {
    return semver.compare(semverify(a), semverify(b))
  })

  debug('%s: %s - %o', feature, browser, versions)

  var out = null
  for (var i = 0; i < versions.length; i++) {
    var version = versions[i]
    if (!out && obj[version] === 'y') {
      out = version.split('-')[0] // versions are sometimes ranged
    } else if (out && obj[version] !== 'y') {
      // if a lower version supports something,
      // but a higher version does not,
      // we disable it. specifically,
      // performance.now() on iOS 8 -> 8.1
      // http://caniuse.com/#feat=nav-timing
      out = false
    }
  }

  debug('%s: %s - %s', feature, browser, out)

  return out
}

function semverify(x) {
  x = x.split('-')[0]
  while (!semver.valid(x)) x += '.0'
  return x
}
