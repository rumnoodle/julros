const assert = require("chai").assert;
const rewire = require("rewire");
const app = rewire("../index.js");

const getViewsFolder = app.__get__("getViewsFolder");

describe("Paths to views, layouts etc are resolved correctly", () => {
  it("should return correct views folder", () => {
    const viewspath = "./src/views";
    const viewFilepath = "/home/who/project/src/views/index.julros";
    const expected = "/home/who/project/src/views";

    assert.equal(expected, getViewsFolder(viewFilepath, viewspath));
  });

  it("should return correct views folder when path contains multiple matches of views path", () => {
    const viewspath = "./src/views";
    const viewFilepath =
      "/home/who/project/src/views/fold/src/views/index.julros";
    const expected = "/home/who/project/src/views/fold/src/views";

    assert.equal(expected, getViewsFolder(viewFilepath, viewspath));
  });
});
