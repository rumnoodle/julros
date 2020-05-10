const assert = require("chai").assert;
const literalToken = require("../tokens/literal-token.js");

describe("Test literal token", () => {
  it("should return contents", () => {
    const value = '"this is content"';
    assert.equal(literalToken.getToken(value).getValue(), "this is content");
  });

  it("should not handle malformed content properly", () => {
    const value = '"this is content';
    assert.equal(literalToken.getToken(value).getValue(), "this is conten");
  });
});
