const file = require("./src/file.js");
const parser = require("./src/parser.js");

exports.render = function(viewFilePath, data) {
  const view = file.fetch(viewFilePath);
  return parser.html(view, data);
}

exports.__express = exports.render;
