const assert = require("chai").assert;
const variableToken = require("../tokens/variable-token.js");

describe("Test variable token", () => {
  it("should return contents of variable if exists", () => {
    const value = "variable";
    const variableValue = "variable value";
    assert.equal(
      variableToken.getToken(value).getValue({ variable: variableValue }),
      variableValue
    );
  });
});
