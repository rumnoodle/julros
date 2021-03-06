const fs = require("fs");
const assert = require("chai").assert;
const app = require("../index.js");

describe("Test that a template is parsed and rendered", () => {
  it("handles a complete template", () => {
    const expected = fs.readFileSync("views/test/expected.html", "utf8").replace(/\n$/, "");
    const data = {
      soup: "Soup is good for the soul.",
      trueish: true,
      falseish: false,
      loopitems: [{loopitemvariable: "First loop object"}, {loopitemvariable: "Second loop object"}]
    };
    const result = app.render("test/integration", data, "test/layout");
    assert.equal(result, expected);
  });
});
