const assert = require("chai").assert;
const rewire = require("rewire");
const include = rewire("../src/include.js");
const Include = include.Include;

const fileMock = {
  fetch: function(filePath) {
    return "<p>This is a partial template</p>";
  }
}

include.__set__("file", fileMock);

describe("Test includes", () => {
  it("template should be fetched", () => {
    const includeHandler = new Include();
    assert.equal(includeHandler.fetch("/views/partial"), "<p>This is a partial template</p>");
  });
});
