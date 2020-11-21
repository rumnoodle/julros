const file = require("./src/file.js");
const main = require("./src/main.js");

exports.render = function(viewPath, data, layoutPath = undefined) {
  return main.html(viewPath, data, layoutPath);
}

exports.__express = (viewPath, options, callback) {
  exports.render(viewPath, options, options['layout'] || undefined);
}
