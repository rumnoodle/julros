const assert = require("chai").assert;
const rewire = require("rewire");
const app = rewire("../index.js");

getFileContentsMock = function (filePath) {
  if (filePath === "/home/who/project/src/views/index.julros") {
    return "<p>This is the view</p>";
  } else if (
    filePath === "/home/who/project/src/views/layouts/default.julros"
  ) {
    return "<body>{ view }</body>";
  } else {
    return "";
  }
};

app.__set__("getFileContents", getFileContentsMock);

describe("Test render compiles view correctly", () => {
  it("compile view", () => {
    const viewFilePath = "/home/who/project/src/views/index.julros";
    const expected = "<body><p>This is the view</p></body>";
    const options = {
      settings: {
        views: "./src/views",
      },
    };

    assert.equal(expected, app.render(viewFilePath, options));
  });
});
