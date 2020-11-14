const file = require("./src/file.js");
const main = require("./src/main.js");

exports.render = function(viewPath, data) {
  return main.html(viewPath, data);
}

exports.__express = exports.render;
