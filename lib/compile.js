
var satisfies = require('semver').satisfies

/**
 * Compile a filter function from an object of browsers and versions.
 * Order matters! Should go from more specific to less speicifc.
 * We also include aliases for custom objects.
 *
 * TODO: aliases
 */

var families = {
  // mobile
  ios: /\b(ios|mobile safari)\b/i,
  ffm: /\b(ff mobile|ffm|firefox mobile)\b/i,
  iep: /\b(ie phone|iep|internet explorer phone|windows phone)\b/i,
  chm: /\b(chrome mobile)\b/i,
  opm: /\b(opera mini)\b/i,
  android: /\b(android)\b/i,

  // desktop, etc.
  ie: /\b(ie|internet explorer)\b/i,
  ff: /\b(ff|firefox)\b/i,
  chrome: /\b(chrome|chromium)\b/i,
  safari: /\b(safari)\b/i,
  opera: /\b(op|opera)\b/i,
}

// each filter only tests for a single agent
module.exports = function (browsers) {
  var str = 'var family = agent.family\n'

  // compile a semver version string
  str += 'var version = agent.version = agent.version '
    + '|| [agent.major || 0, agent.minor || 0, agent.patch || 0].join(".")\n'

  Object.keys(families).forEach(function (name) {
    var version = browsers[name]
    // the version is not defined
    if (version == null) return
    // this is supported in all versions
    if (version === true) return str += 'if (families.' + name + '.test(family)) return false\n'
    // this is not supported in all versions
    if (version === false) return str += 'if (families.' + name + '.test(family)) return true\n'
    // if it's just a number like `8`, it's a minimum major version
    if (typeof version === 'number') version = '>= ' + version
    // check semver result
    str += 'if (families.' + name + '.test(family)) '
      + 'return !satisfies(version, "' + version + '")\n'
  })

  // default result
  str += 'return ' + String(browsers.default !== false)
  // compile the result
  return eval('(function filter(agent) {\n' + str + '\n})')
}
