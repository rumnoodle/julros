const assert = require("chai").assert;
const rewire = require("rewire");
const viewBuilder = rewire("../view-builder.js");

let fileMock = {
  getFileContents: function (filepath) {
    if (filepath === "/home/who/project/src/views/partials/test.julros") {
      return "Partial <i>template</i>";
    } else {
      return "Partial <i>template</i> with { variable }";
    }
  },

  getViewsFolder: function () {
    return "";
  },
  getLayoutFilePath: function () {
    return "";
  },
  getPartialsPath: function (viewsFolder, partialsPath) {
    return "/home/who/project/src/views/" + partialsPath;
  },
};

viewBuilder.__set__("file", fileMock);

describe("Test that included partials and views are added correctly", () => {
  it("should include partial template", () => {
    const view =
      "<p>A view with a <span>{ include partials/test.julros }</span></p>";
    const expected =
      "<p>A view with a <span>Partial <i>template</i></span></p>";

    assert.equal(viewBuilder.build(view, {}), expected);
  });

  it("should parse variable within partial", () => {
    const view =
      "<p>A view with a <span>{ include partials/var-test.julros }</span></p>";
    const expected =
      "<p>A view with a <span>Partial <i>template</i> with variable value</span></p>";

    assert.equal(
      viewBuilder.build(view, { variable: "variable value" }),
      expected
    );
  });
});
