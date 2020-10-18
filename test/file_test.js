const assert = require("chai").assert;
const rewire = require("rewire");
const file = rewire("../src/file.js");

const fileSystemMock = {
  readFileSync(path, options) {
    console.log(path);
    if (path.endsWith("views/finger-food.julros")) {
      return "<p>This template has finger food.</p>";
    }

    return null;
  },

  existsSync(path) {
    return true;
  }
}

file.__set__("fs", fileSystemMock);

describe("Test fetching templates", () => {
  it("found template should  be returned as is", () => {
    assert.equal(file.fetch("finger-food"), "<p>This template has finger food.</p>");
  });
});
