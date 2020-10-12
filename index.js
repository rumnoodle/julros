const fs = require("fs");

exports.render = function(viewFilePath) {
  let path = "";
  if (fs.existsSync("src/views")) {
    path = ["src", "views"];
  } else if (fs.existsSync("views")) {
    path = ["views"];
  }
  return fs.readFileSync(`${path.join("/")}/${viewFilePath}.julros`);
}

exports.__express = exports.render;

