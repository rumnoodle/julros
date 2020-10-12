const assert = require("chai").assert;
const parser = require("../src/parser.js");

describe("Test parser", () => {
  it("should return empty html when content is empty", () => {
    const result = parser.html("");
    assert.equal("", result);
  });
});
