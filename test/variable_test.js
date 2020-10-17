const assert = require("chai").assert;
const variable = require("../src/variable.js");
const Variable = variable.Variable;

describe("Test variable handling", () => {
  it("should return value of found variable", () => {
    const variableHandler = new Variable({ thing: "Grokked" });
    assert.equal(variableHandler.fetch("thing"), "Grokked");
  });

  it("should return value of nested found variable", () => {
    const variableHandler = new Variable({ thing: { inner: "Grokked" } });
    assert.equal(variableHandler.fetch("thing.inner"), "Grokked");
  });

  it("should return object if nesting not deep value turns out to be object", () => {
    const variableHandler = new Variable({ thing: { inner: "Grokked" } });
    assert.equal(variableHandler.fetch("thing").toString(), { inner: "Grokked" }.toString());
  });

  it("should throw error if value not found", () => {
    const variableHandler = new Variable({});
    assert.throws(
      () => variableHandler.fetch("missing"),
      "'missing' does not exist in data provided."
    );
  });
});
