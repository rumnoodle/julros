const file = require("./file.js");

class Include {
  constructor() {}

  fetch(path) {
    return file.fetch(path);
  }
}

exports.Include = Include;
