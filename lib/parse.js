
var ua = require('useragent')

/**
 * Agents must either be:
 *   - A useragent string.
 *   - An object of the form {family, major, minor, patch} to match UA
 *
 * A single object is always returned
 */

module.exports = function (obj) {
  if (!obj) return { family: 'Unknown' }
  if (typeof obj === 'string') return ua.lookup(obj)
  if ('family' in obj) return obj // already an object
  /* istanbul ignore next */
  throw new TypeError('unknown obj: ' + obj)
}
