const assert = require("chai").assert;
const rewire = require("rewire");
const viewBuilder = rewire("../view-builder.js");

describe("Test collections", () => {
  it("should not do anything when collection doesn't exist", () => {
    const view =
      '<div>Collection: { collection "<ul>", "<li>{item}</li>", collection }</div>';
    const expected = "<div>Collection: </div>";

    assert.equal(viewBuilder.build(view, {}), expected);
  });

  it("should add items of collection if exists", () => {
    const view =
      '<div>Collection: { collection "<ul>", "<li>{item}</li>", collection }</div>';
    const expected = "<div>Collection: <ul><li>one</li><li>two</li></ul></div>";

    assert.equal(
      viewBuilder.build(view, { collection: ["one", "two"] }),
      expected
    );
  });
});
