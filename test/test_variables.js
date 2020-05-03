const assert = require("chai").assert;
const rewire = require("rewire");
const viewBuilder = rewire("../view-builder.js");

describe("Test that variables are parsed", () => {
  it("should parse variable and replace with value", () => {
    const view = "<p>This is a { variable }</p>";
    const expected = "<p>This is a variable value</p>";

    assert.equal(
      viewBuilder.build(view, { variable: "variable value" }),
      expected
    );
  });

  it("should parse multiple variables", () => {
    const view = "<p>This is a { variable }\nand this is { another }</p>";
    const expected =
      "<p>This is a variable value\nand this is another value</p>";

    assert.equal(
      viewBuilder.build(view, {
        variable: "variable value",
        another: "another value",
      }),
      expected
    );
  });

  it("should parse same variable multiple times", () => {
    const view = "<p>This is a { variable }\nand this is { variable }</p>";
    const expected =
      "<p>This is a variable value\nand this is variable value</p>";

    assert.equal(
      viewBuilder.build(view, {
        variable: "variable value",
      }),
      expected
    );
  });
});
