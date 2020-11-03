const file = require("./file.js");

class Conditional {
  constructor() {}

  checkIf(condition, trueTemplatePath, falseTemplatePath) {
    if (condition) {
      return this.fetchTemplate(trueTemplatePath);
    } else {
      return this.fetchTemplate(falseTemplatePath);
    }
  }

  fetchTemplate(path) {
    try {
      return file.fetch(path);
    } catch (err) {
      return `&#x007b;&#x007b; ${err.message || err} &#x007d;&#x007d;`;
    }
  } 
}

exports.Conditional = Conditional;
