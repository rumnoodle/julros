const assert = require("chai").assert;
const rewire = require("rewire");
const includeToken = rewire("../tokens/include-token.js");

let fileMock = {
  getFileContents: function (filepath) {
    return "<p>This is file contents</p>";
  },

  getViewsFolder: function () {
    return "";
  },
  getLayoutFilePath: function () {
    return "";
  },
  getPartialsPath: function (viewsFolder, partialsPath) {
    return "";
  },
  fileExists: function (path) {
    if (path === "/existing/path/file.julros") {
      return true;
    } else {
      return false;
    }
  },
};
includeToken.__set__("file", fileMock);

describe("Test include token", () => {
  it("should have a path to an existing file", () => {
    const value = "/existing/path/file.julros";
    assert.equal(includeToken.getToken(value).valid, true);
  });

  it("should be possible to get contents if file exists", () => {
    const value = "/existing/path/file.julros";
    assert.equal(
      includeToken.getToken(value).getValue(),
      "<p>This is file contents</p>"
    );
  });

  it("should return false if trying to get content from invalid token", () => {
    const value = "/non-existing/path/file.julros";
    assert.equal(includeToken.getToken(value).valid, false);
    assert.equal(includeToken.getToken(value).getValue(), false);
  });
});
