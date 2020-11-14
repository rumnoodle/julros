const assert = require("chai").assert;
const rewire = require("rewire");
const loop = rewire("../src/loop.js");
const Loop = loop.Loop;

const fileMock = {
  fetch: function(filePath) {
    if (filePath == "path/to/template") {
      return "<p>Basic Template</p>";
    }
  }
}

loop.__set__("file", fileMock);

describe("Loops", () => {
  it("should do nothing if empty list", () => {
    const loop = new Loop();
    assert.equal("", loop.run("path/to/template", []));
  });

  it("should add template for every instance of loop", () => {
    const loop = new Loop();
    assert.equal(
      "<p>Basic Template</p><p>Basic Template</p>",
      loop.run("path/to/template", ["one", "two"])
    );
  });
});
