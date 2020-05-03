const assert = require("chai").assert;
const rewire = require("rewire");
const viewBuilder = rewire("../view-builder.js");

let fileMock = {
  getFileContents: function (filepath) {
    return "Partial <i>template</i>";
  },

  getViewsFolder: function () {
    return "";
  },
  getLayoutFilePath: function () {
    return "";
  },
  getPartialsPath: function () {
    return "";
  },
};

viewBuilder.__set__("file", fileMock);

describe("Test that included partials and views are added correctly", () => {
  it("should include template", () => {
    const view =
      "<p>A view with a <span>{ include partial/test.julros }</span></p>";
    const expected =
      "<p>A view with a <span>Partial <i>template</i></span></p>";

    assert.equal(viewBuilder.build(view, {}), expected);
  });
});
