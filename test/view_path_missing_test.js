const assert = require("chai").assert;
const rewire = require("rewire");
const file = rewire("../src/file.js");

const fileSystemMock = {
  readFileSync(path, options) {},
  existsSync(path) {
    return false;
  }
}

file.__set__("fs", fileSystemMock);

describe("Test what happens when views folder is not found", () => {
  it("should throw error if views folder is missing", () => {
    assert.throw(
      () => file.fetch("no-view-folder"),
      "No views folder found."
    );
  });
});
