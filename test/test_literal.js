const assert = require("chai").assert;
const rewire = require("rewire");
const viewBuilder = rewire("../view-builder.js");

describe("Test literals", () => {
  it("should do nothing with empty literal", () => {
    const view = '<p>Testing literal { literal "" }</p>';
    const expected = "<p>Testing literal </p>";

    assert.equal(viewBuilder.build(view, {}), expected);
  });

  it("should put contents of literal into view as is", () => {
    const view = '<p>Testing literal { literal "{literal}" }</p>';
    const expected = "<p>Testing literal {literal}</p>";

    assert.equal(viewBuilder.build(view, {}), expected);
  });

  it("should be able to handle variables", () => {
    const view = "<p>Testing literal { literal variable }</p>";
    const expected = "<p>Testing literal literal variable</p>";

    assert.equal(
      viewBuilder.build(view, { variable: "literal variable" }),
      expected
    );
  });
});
