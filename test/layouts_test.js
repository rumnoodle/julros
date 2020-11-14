const assert = require("chai").assert;
const rewire = require("rewire");
const layout = rewire("../src/layout.js");

const fileMock = {
  fetch: function(filePath) {
    return "<body>{{ page }}</body>";
  }
}

layout.__set__("file", fileMock);

describe("Test layouts", () => {
  it("should insert view into layout", () => {
    assert.equal(
      layout.wrap("path/to/layout", "<p>This is the view</p>"),
      "<body><p>This is the view</p></body>"
    );
  });
});
