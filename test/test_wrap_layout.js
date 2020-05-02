const assert = require("chai").assert;
const rewire = require("rewire");
const app = rewire("../index.js");

const wrapLayout = app.__get__("wrapLayout");

describe("Test wrapping layout around view", () => {
  it("should replace {{ view }} with correct view in layout", () => {
    const layout = "<body>{{ view }}</body>";
    const view = "<p>This is the view</p>";
    const expected = "<body><p>This is the view</p></body>";

    assert.equal(expected, wrapLayout(layout, view));
  });
});
