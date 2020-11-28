const file = require("./src/file.js");
const main = require("./src/main.js");

exports.render = function(viewPath, data, layoutPath = undefined) {
  return main.html(viewPath, data, layoutPath);
}

exports.__express = function(viewPath, options, callback) {
  try {
    let content = exports.render(viewPath, options, options['layout'] || undefined);
    return callback(null, content);
  } catch (err) {
    return callback(err);
  }
}
