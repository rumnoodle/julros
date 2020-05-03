const assert = require("chai").assert;
const rewire = require("rewire");
const viewBuilder = rewire("../view-builder.js");

describe("Test that variables are parsed", () => {
  it("should parse variable and replace with value", () => {
    const view = "<p>This is a { variable }</p>";
    const expected = "<p>This is a variable value</p>";

    assert.equal(
      expected,
      viewBuilder.build(view, { variable: "variable value" })
    );
  });
});
