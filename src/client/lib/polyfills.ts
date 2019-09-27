export const includes = require('core-js/library/fn/string/virtual/includes')
const repeat = require('core-js/library/fn/string/virtual/repeat')
const assign = require('core-js/library/fn/object/assign')

String.prototype.includes = includes
String.prototype.repeat = repeat
Object.assign = assign
