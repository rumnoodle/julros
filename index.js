const file = require("./src/file.js");
const main = require("./src/main.js");

exports.render = function(viewFilePath, data) {
  const view = file.fetch(viewFilePath);
  return main.html(view, data);
}

exports.__express = exports.render;
