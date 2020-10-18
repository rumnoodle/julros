const fs = require("fs");

function fetch(path) {
  let fileContent = fs.readFileSync(path).toString();
  return fileContent;
}

exports.fetch = fetch;
