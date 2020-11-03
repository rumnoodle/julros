const assert = require("chai").assert;
const rewire = require("rewire");
const conditional = rewire("../src/conditional.js");
const Conditional = conditional.Conditional;

const fileMock = {
  fetch: function(filePath) {
    if (filePath == "path/to/template") {
      return "<p>This is a template</p>";
    } else if (filePath == "path/to/else/template") {
      return "<p>This is an else template</p>";
    }
  }
}

conditional.__set__("file", fileMock);

describe("Test conditionals, if and else", () => {
  it("should return template if condition is true", () => {
    const conditionalHandler = new Conditional();
    assert.equal(
      conditionalHandler.checkIf(
        true,
        "path/to/template",
        "path/to/else/template"
      ),
      "<p>This is a template</p>"
    );
  });

  it("should return else template if condition is false", () => {
    const conditionalHandler = new Conditional();
    assert.equal(
      conditionalHandler.checkIf(
        false,
        "path/to/template",
        "path/to/else/template"
      ),
      "<p>This is an else template</p>"
    );
  });
});
