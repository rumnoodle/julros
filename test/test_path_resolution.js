const assert = require("chai").assert;
const rewire = require("rewire");
const app = rewire("../index.js");

const getViewsFolder = app.__get__("getViewsFolder");
const getLayoutFilePath = app.__get__("getLayoutFilePath");

describe("Paths to views, layouts etc are resolved correctly", () => {
  it("should return correct views folder", () => {
    const viewsPath = "./src/views";
    const viewFilePath = "/home/who/project/src/views/index.julros";
    const expected = "/home/who/project/src/views";

    assert.equal(expected, getViewsFolder(viewFilePath, viewsPath));
  });

  it("should return correct views folder when path contains multiple matches of views path", () => {
    const viewsPath = "./src/views";
    const viewFilePath =
      "/home/who/project/src/views/fold/src/views/index.julros";
    const expected = "/home/who/project/src/views/fold/src/views";

    assert.equal(expected, getViewsFolder(viewFilePath, viewsPath));
  });

  it("should get correct layouts file path", () => {
    const viewsFolder = "/home/who/project/src/views";
    const layoutName = "cool-layout";
    const expected = "/home/who/project/src/views/layouts/cool-layout.julros";

    assert.equal(expected, getLayoutFilePath(viewsFolder, layoutName));
  });
});
