const file = require("./file.js");
const parser = require("./parser.js");

class Loop {
  constructor() {}

  run(templatePath, data) {
    const templateContents = file.fetch(templatePath);
    let html = "";

    data.forEach(object => {
      html += parser.run(templateContents, object);
    });

    return html;
  }
}

exports.Loop = Loop;
