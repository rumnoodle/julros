const fs = require("fs");

exports.render = function (filename, options, callback) {
  const content = fs.readFileSync(filename, "utf8");
  return content;
};

exports.renderFile = function (filename, options, callback) {
  callback(null, exports.render(filename, options, callback));
};

exports.__express = exports.renderFile;
