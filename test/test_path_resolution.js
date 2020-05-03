const assert = require("chai").assert;
const file = require("../file.js");

describe("Paths to views, layouts etc are resolved correctly", () => {
  it("should return correct views folder", () => {
    const viewsPath = "./src/views";
    const viewFilePath = "/home/who/project/src/views/index.julros";
    const expected = "/home/who/project/src/views";

    assert.equal(file.getViewsFolder(viewFilePath, viewsPath), expected);
  });

  it("should return correct views folder when path contains multiple matches of views path", () => {
    const viewsPath = "./src/views";
    const viewFilePath =
      "/home/who/project/src/views/fold/src/views/index.julros";
    const expected = "/home/who/project/src/views/fold/src/views";

    assert.equal(file.getViewsFolder(viewFilePath, viewsPath), expected);
  });

  it("should get correct layouts file path", () => {
    const viewsFolder = "/home/who/project/src/views";
    const layoutName = "cool-layout";
    const expected = "/home/who/project/src/views/layouts/cool-layout.julros";

    assert.equal(file.getLayoutFilePath(viewsFolder, layoutName), expected);
  });
});
