const assert = require("chai").assert;
const loop = require("../src/loop.js");
const Loop = loop.Loop;

describe("Loops", () => {
  it("should do nothing if empty list", () => {
    const loop = new Loop();
    assert.equal("", loop.run("path/to/template", []));
  });
});
