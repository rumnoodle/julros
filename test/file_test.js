const assert = require("chai").assert;
const rewire = require("rewire");
const file = rewire("../src/file.js");

const fileSystemMock = {
  readFileSync(path, options) {
    if (path.endsWith("views/finger-food.julros")) {
      return "<p>This template has finger food.</p>";
    }

    let err = new Error("Could not open file");
    err.code = "ENOENT";
    throw err;
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

  it("should throw error on not found template", () => {
    assert.throw(
      () => file.fetch("missing"),
      "Template 'missing' not found."
    );
  });
});
