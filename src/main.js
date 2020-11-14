const parser = require('./parser.js');

// If possible keep pattern this simple, only to search for next occurrence until all have been replaced.
const pattern = /\{\{ .*? \}\}/;

exports.html = (view, data) => {
  return parser.run(view, data);
}
