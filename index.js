const fs = require("fs");
const parser = require("./src/parser.js");

exports.render = function(viewFilePath, data) {
  let path = "";
  if (fs.existsSync("src/views")) {
    path = ["src", "views"];
  } else if (fs.existsSync("views")) {
    path = ["views"];
  }
  const view = fs.readFileSync(`${path.join("/")}/${viewFilePath}.julros`).toString();
  return parser.html(view, data);
}

exports.__express = exports.render;

