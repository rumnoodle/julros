const file = require("./file.js");

class Loop {
  constructor() {}

  run(templatePath, data) {
    const templateContents = file.fetch(templatePath);
    let html = "";

    data.forEach(object => {
      html += templateContents;
    });

    return html;
  }
}

exports.Loop = Loop;
