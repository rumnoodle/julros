const assert = require("chai").assert;
const rewire = require("rewire");
const loop = rewire("../src/loop.js");
const Loop = loop.Loop;

const fileMock = {
  fetch: function(filePath) {
    if (filePath == "path/to/template") {
      return "<p>Basic Template</p>";
    } else if (filePath == "path/to/variable/template") {
      return "<p>{{ one }}, {{ two }}</p>";
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

  it("should parse this as a miniature view", () => {
    // technically conditionals and loops etc should work, but assume that
    // it's working as should if variables are put in correct place by parser.
    // We use the same parser that parses the larger view.
    const loop = new Loop();
    assert.equal(
      "<p>Variable one, Variable two</p>",
      loop.run("path/to/variable/template", [{one: "Variable one", two: "Variable two"}])
    );
  });
});
