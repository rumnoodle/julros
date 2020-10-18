const file = require("./file.js");

class Include {
  constructor() {}

  fetch(path) {
    try {
      return file.fetch(path);
    } catch (err) {
      return `&#x007b;&#x007b; ${err.message || err} &#x007d;&#x007d;`;
    }
  }
}

exports.Include = Include;
