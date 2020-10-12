const fs = require("fs");
const assert = require("chai").assert;
const app = require("../index.js");

describe("Test that a template is parsed and rendered", () => {
  it("does something", () => {
    const expected = fs.readFileSync("views/test/expected.html", "utf8");
    const result = app.render("test/integration");
    assert.equal(result, expected);
  });
});
