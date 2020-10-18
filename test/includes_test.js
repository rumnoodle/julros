const assert = require("chai").assert;
const rewire = require("rewire");
const include = rewire("../src/include.js");
const Include = include.Include;

const fileMock = {
  fetch: function(filePath) {
    if (filePath === "missing") {
      const err = new Error("Template 'missing' not found.");
      err.code = "ENOENT";
      throw err;
    }
    return "<p>This is a partial template</p>";
  }
}

include.__set__("file", fileMock);

describe("Test includes", () => {
  it("template should be fetched", () => {
    const includeHandler = new Include();
    assert.equal(includeHandler.fetch("/views/partial"), "<p>This is a partial template</p>");
  });

  it("should return missing template message if no template found", () => {
    const includeHandler = new Include();
    assert.equal(
      includeHandler.fetch("missing"),
      "&#x007b;&#x007b; Template 'missing' not found. &#x007d;&#x007d;"
    );
  });
});
