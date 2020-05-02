const assert = require("chai").assert;
const rewire = require("rewire");
const app = rewire("../index.js");

const replaceVariables = app.__get__("replaceVariables");

describe("Test handling of variables", () => {
  it("should replace variable with value", () => {
    const view = "<p>This is the view with { variable }</p>";
    const expected = "<p>This is the view with value of variable</p>";

    assert.equal(
      expected,
      replaceVariables(view, { variable: "value of variable" })
    );
  });
});
